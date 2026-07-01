import React, { forwardRef } from 'react';

/**
 * ResumePreview — Renders the live resume preview in A4 format (Letter format).
 * Supports three templates: Professional, Modern, and Minimal.
 */
const ResumePreview = forwardRef(({ resumeData, template = 'professional' }, ref) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = resumeData;

  const hasData =
    personalInfo.fullName ||
    personalInfo.email ||
    personalInfo.summary ||
    experience.length > 0 ||
    education.length > 0 ||
    skills.length > 0 ||
    projects.length > 0 ||
    certifications.length > 0;

  if (!hasData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/20 border border-white/5 rounded-2xl p-8 text-center text-slate-500 min-h-[400px]">
        <svg className="w-12 h-12 text-slate-600 mb-4 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h4 className="text-sm font-semibold text-slate-300 mb-1">Live Resume Preview</h4>
        <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
          Start filling out your personal details and sections to see your resume render in real time.
        </p>
      </div>
    );
  }

  // --- 1. PROFESSIONAL TEMPLATE ---
  const renderProfessional = () => {
    return (
      <div className="p-10 text-slate-800 text-xs leading-normal">
        {/* Header */}
        <div className="text-center border-b pb-4 mb-5 border-slate-300">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1.5">
            {personalInfo.fullName || 'YOUR NAME'}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-slate-600 text-[10px]">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <span>
                • <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="underline">{personalInfo.linkedin}</a>
              </span>
            )}
            {personalInfo.github && (
              <span>
                • <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="underline">{personalInfo.github}</a>
              </span>
            )}
            {personalInfo.website && (
              <span>
                • <a href={`https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="underline">{personalInfo.website}</a>
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <p className="text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2.5">
              Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between font-semibold text-slate-900 mb-0.5">
                    <span>{exp.jobTitle || 'Position'} @ {exp.company || 'Company'}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="text-[10px] text-slate-500 mb-1">{exp.location}</div>
                  )}
                  {exp.description && (
                    <p className="text-slate-700 leading-relaxed text-[11px] whitespace-pre-line text-justify pl-2 border-l border-slate-200">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2.5">
              Education
            </h3>
            <div className="space-y-3.5">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between font-semibold text-slate-900 mb-0.5">
                    <span>{edu.degree || 'Degree'}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    {edu.gpa && <span className="font-semibold text-slate-700">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-slate-600 leading-relaxed text-[10.5px]">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2.5">
              Skills
            </h3>
            <div className="space-y-1.5">
              {skills.map((skill, index) => (
                <div key={index} className="flex text-[11px]">
                  <span className="font-semibold text-slate-800 w-28 shrink-0">
                    {skill.category || 'Skills'}:
                  </span>
                  <span className="text-slate-600">{skill.items}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2.5">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex justify-between font-semibold text-slate-900 mb-0.5">
                    <span>
                      {proj.name || 'Project Name'}
                      {proj.link && (
                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10px] font-normal text-indigo-600 hover:underline ml-2">
                          🔗 {proj.link}
                        </a>
                      )}
                    </span>
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] text-slate-500 mb-1">
                      Technologies: <span className="font-medium text-slate-600">{proj.technologies}</span>
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-slate-700 leading-relaxed text-[11px] text-justify">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-100 pb-1 mb-2.5">
              Certifications
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="text-slate-500 text-[10px] block">{cert.issuer}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 text-right">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- 2. MODERN TEMPLATE ---
  const renderModern = () => {
    return (
      <div className="flex min-h-[297mm] text-slate-800 text-xs">
        {/* Left Column (Sidebar) */}
        <div className="w-1/3 bg-slate-900 text-slate-200 p-8 flex flex-col gap-6 select-none no-print-bg">
          {/* Avatar / Initials placeholder */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-3">
              {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AI'}
            </div>
            <h2 className="text-base font-bold text-white tracking-tight leading-tight">
              {personalInfo.fullName || 'YOUR NAME'}
            </h2>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-700 pb-1 mb-2">
              Contact
            </h3>
            <div className="space-y-2 text-[10px] text-slate-300">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">📧</span>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">📞</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">🔗</span>
                  <span className="break-all underline">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">🐙</span>
                  <span className="break-all underline">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-700 pb-1 mb-2.5">
                Skills
              </h3>
              <div className="space-y-2.5">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <p className="font-semibold text-[10.5px] text-white leading-normal mb-1">{skill.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.split(',').map((item, itemIdx) => (
                        <span key={itemIdx} className="bg-slate-800 text-slate-200 text-[9px] px-2 py-0.5 rounded border border-slate-700/50">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-700 pb-1 mb-2.5">
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-[10px]">
                    <p className="font-semibold text-white leading-normal">{cert.name}</p>
                    <p className="text-slate-400">{cert.issuer}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Main) */}
        <div className="flex-1 p-8 flex flex-col gap-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 border-b border-slate-200 pb-1 mb-2">
                Professional Profile
              </h3>
              <p className="text-slate-600 leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 border-b border-slate-200 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-bold text-slate-800 text-[12px]">{exp.jobTitle || 'Position'}</h4>
                      <span className="text-[9px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[10.5px] text-indigo-600 font-semibold mb-1">{exp.company}</div>
                    {exp.description && (
                      <p className="text-slate-600 leading-relaxed text-justify text-[11px]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 border-b border-slate-200 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-3.5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                      <span className="text-[9px] text-slate-500 font-semibold">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                      {edu.gpa && <span className="font-bold text-indigo-600/80">GPA: {edu.gpa}</span>}
                    </div>
                    {edu.description && (
                      <p className="text-slate-600 leading-relaxed text-[10px] mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 border-b border-slate-200 pb-1 mb-3">
                Key Projects
              </h3>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-bold text-slate-800">{proj.name}</h4>
                      {proj.link && (
                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[9px] text-indigo-600 hover:underline">
                          🔗 Link
                        </a>
                      )}
                    </div>
                    {proj.technologies && (
                      <div className="text-[9px] text-slate-400 mb-1">
                        Stack: <span className="text-slate-600 font-medium">{proj.technologies}</span>
                      </div>
                    )}
                    {proj.description && (
                      <p className="text-slate-600 leading-relaxed text-justify text-[11px]">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- 3. MINIMAL TEMPLATE ---
  const renderMinimal = () => {
    return (
      <div className="p-12 text-slate-700 text-xs leading-relaxed max-w-[190mm] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-light tracking-wide text-slate-900 uppercase mb-1">
            {personalInfo.fullName || 'YOUR NAME'}
          </h2>
          <div className="h-0.5 bg-indigo-500 w-12 mb-3" />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-[10px] font-medium">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="underline">{personalInfo.linkedin}</span>}
            {personalInfo.github && <span className="underline">{personalInfo.github}</span>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-slate-600 text-justify text-[11.5px] leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3 border-b pb-1">
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  <div className="text-slate-400 text-[10px] font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <div className="col-span-3 space-y-1">
                    <h4 className="font-bold text-slate-800 text-[11.5px] leading-none">
                      {exp.jobTitle} <span className="font-normal text-slate-400">at</span> {exp.company}
                    </h4>
                    {exp.location && <div className="text-[9.5px] text-slate-400">{exp.location}</div>}
                    {exp.description && (
                      <p className="text-slate-600 text-[10.5px] leading-relaxed text-justify whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3 border-b pb-1">
              Education
            </h3>
            <div className="space-y-3.5">
              {education.map((edu, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  <div className="text-slate-400 text-[10px] font-medium">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div className="col-span-3">
                    <h4 className="font-bold text-slate-800 text-[11.5px] leading-none mb-1">
                      {edu.degree}
                    </h4>
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                    {edu.description && <p className="text-slate-500 text-[10px] mt-0.5">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3 border-b pb-1">
              Projects
            </h3>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  <div className="text-slate-400 text-[10px] font-medium">
                    {proj.technologies || 'Project'}
                  </div>
                  <div className="col-span-3 space-y-1">
                    <h4 className="font-bold text-slate-800 text-[11.5px] leading-none">
                      {proj.name}
                      {proj.link && (
                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[9.5px] font-normal text-indigo-500 hover:underline ml-2">
                          link
                        </a>
                      )}
                    </h4>
                    {proj.description && (
                      <p className="text-slate-600 text-[10.5px] leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Certs */}
        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1">
                Skills
              </h3>
              <div className="space-y-1.5">
                {skills.map((skill, index) => (
                  <div key={index} className="text-[10px]">
                    <span className="font-semibold text-slate-800 block">{skill.category}:</span>
                    <span className="text-slate-500">{skill.items}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1">
                Certifications
              </h3>
              <div className="space-y-1.5">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-[10px] flex justify-between">
                    <div>
                      <span className="font-semibold text-slate-800 block">{cert.name}</span>
                      <span className="text-slate-400">{cert.issuer}</span>
                    </div>
                    <span className="text-slate-400">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="resume-paper mx-auto my-0 bg-white"
      id="resume-pdf-root"
    >
      {template === 'professional' && renderProfessional()}
      {template === 'modern' && renderModern()}
      {template === 'minimal' && renderMinimal()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
