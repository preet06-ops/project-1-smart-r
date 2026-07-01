import { GoogleGenAI } from '@google/genai';

let ai;
function getAiClient() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// ---------------------------------------------------------------------------
// Build the analysis prompt
// ---------------------------------------------------------------------------
function buildPrompt(resumeData) {
  const resumeJSON = JSON.stringify(resumeData, null, 2);

  return `
You are an expert career coach and professional resume reviewer.

Analyse the following resume data and provide **actionable, specific improvement suggestions** for every relevant section. Return your response as valid JSON — nothing else.

### Resume Data
\`\`\`json
${resumeJSON}
\`\`\`

### Instructions
1. **Summary / Objective** — Is it compelling and tailored? Does it highlight key value propositions? Suggest improvements if it is generic, missing, or too long.
2. **Experience** — For each role, suggest stronger action verbs, recommend quantifiable achievements (metrics, percentages, dollar amounts), and flag vague descriptions.
3. **Education** — Check completeness. Suggest adding relevant coursework, honours, or GPA if missing and beneficial.
4. **Skills** — Evaluate relevance to common job markets. Suggest missing in-demand skills (e.g. cloud, AI/ML, DevOps) and recommend organising into clear categories.
5. **Projects** — Suggest adding measurable impact, technologies used, and links. Flag any projects that lack descriptions.
6. **Certifications** — Recommend relevant industry certifications the candidate could pursue based on their profile.
7. **Overall Structure & Completeness** — Flag any empty or critically missing sections. Suggest ordering improvements.

### Output Format
Return **only** a JSON object (no markdown fences, no commentary) with this exact structure:

{
  "suggestions": [
    {
      "section": "<section name, e.g. 'summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'overall'>",
      "title": "<short title of the suggestion>",
      "suggestion": "<detailed, actionable suggestion text>",
      "priority": "<high | medium | low>"
    }
  ]
}

Provide between 4 and 10 suggestions, ordered by priority (high first).
`.trim();
}

// ---------------------------------------------------------------------------
// Extract JSON from a response that might be wrapped in markdown fences
// ---------------------------------------------------------------------------
function extractJSON(text) {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Strip markdown code fences (```json ... ``` or ``` ... ```)
    const fenceRegex = /```(?:json)?\s*([\s\S]*?)```/;
    const match = text.match(fenceRegex);
    if (match) {
      return JSON.parse(match[1].trim());
    }
    throw new Error('Unable to parse JSON from Gemini response.');
  }
}

// ---------------------------------------------------------------------------
// Public API — get resume suggestions from Gemini
// ---------------------------------------------------------------------------
export async function getResumeSuggestions(resumeData) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.');
  }

  const prompt = buildPrompt(resumeData);

  const response = await getAiClient().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error('Received an empty response from Gemini.');
  }

  const parsed = extractJSON(text);

  // Normalise — the model should return { suggestions: [...] }
  if (Array.isArray(parsed.suggestions)) {
    return parsed.suggestions;
  }

  // If the model returned a bare array, wrap it
  if (Array.isArray(parsed)) {
    return parsed;
  }

  throw new Error('Unexpected response structure from Gemini.');
}
