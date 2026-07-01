import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';
import AISuggestions from './components/AISuggestions';
import html2pdf from 'html2pdf.js';
import './App.css';

const DEFAULT_RESUME_DATA = {
  personalInfo: {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    website: 'janedoe.dev',
    summary: 'Senior Software Engineer with 6+ years of experience specializing in building responsive React applications and distributed Node.js microservices. Proven track record of optimizing performance and leading cross-functional teams to deliver scalable software solutions.'
  },
  experience: [
    {
      jobTitle: 'Senior Software Engineer',
      company: 'TechNovation Solutions',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      description: '- Lead developer for the core user dashboard, rebuilding legacy systems in React and reducing load times by 40%.\n- Architected and implemented a serverless API gateway using Node.js, reducing server overhead costs by 25%.\n- Mentored 4 junior developers and established code review practices to improve overall code quality.'
    },
    {
      jobTitle: 'Software Engineer',
      company: 'DataStream Inc.',
      location: 'Boston, MA',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      current: false,
      description: '- Developed responsive web interfaces using React and Tailwind CSS for cloud management tools.\n- Designed database schemas in MongoDB and wrote optimized aggregation queries to reduce report generation times.'
    }
  ],
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Northeastern University',
      location: 'Boston, MA',
      startDate: '2017',
      endDate: '2019',
      gpa: '3.8/4.0',
      description: 'Specialization in Software Engineering and Distributed Systems.'
    },
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'University of Washington',
      location: 'Seattle, WA',
      startDate: '2013',
      endDate: '2017',
      gpa: '3.7/4.0',
      description: 'Minor in Mathematics.'
    }
  ],
  skills: [
    { category: 'Languages', items: 'JavaScript, TypeScript, Python, HTML/CSS, SQL' },
    { category: 'Frameworks/Libraries', items: 'React, Node.js, Express, Next.js, Redux Toolkit' },
    { category: 'Databases & Tools', items: 'MongoDB, PostgreSQL, Git, Docker, AWS (S3, Lambda, EC2)' }
  ],
  projects: [
    {
      name: 'Smart Portfolio Builder',
      description: 'A dynamic portfolio generator for developers featuring customizable templates, markdown support, and single-click hosting integration.',
      technologies: 'React, Vite, Node.js, MongoDB, Tailwind CSS',
      link: 'github.com/janedoe/portfolio-builder'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'Mar 2024',
      link: ''
    }
  ]
};

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    // Attempt to load from localStorage first
    const saved = localStorage.getItem('resume_builder_draft');
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
  });
  const [resumeId, setResumeId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [suggestions, setSuggestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Mobile active view: 'edit' or 'preview'
  const [mobileView, setMobileView] = useState('edit');

  const previewRef = useRef(null);
  const API_BASE = import.meta.env.VITE_API_BASE || '/api';

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('resume_builder_draft', JSON.stringify(resumeData));
  }, [resumeData]);

  // Handle section changes from form
  const handleFormChange = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // Save / Update Resume in MongoDB
  const handleSaveResume = async () => {
    setSaving(true);
    try {
      const url = resumeId ? `${API_BASE}/resumes/${resumeId}` : `${API_BASE}/resumes`;
      const method = resumeId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resumeData, templateId: selectedTemplate }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result._id) {
          setResumeId(result._id);
        }
        alert('Resume saved successfully!');
      } else {
        alert(`Failed to save: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Could not connect to the backend server. The backend might not be running or MongoDB is offline.');
    } finally {
      setSaving(false);
    }
  };

  // Get AI suggestions from Google Gemini API
  const handleGetSuggestions = async () => {
    setAiLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ai/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuggestions(result.suggestions || []);
      } else {
        alert(`AI Analysis Failed: ${result.error || result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
      alert('Could not connect to the backend AI service. Please ensure the backend server is running.');
    } finally {
      setAiLoading(false);
    }
  };

  // Export PDF using html2pdf.js
  const handleExportPDF = () => {
    setExporting(true);
    const element = document.getElementById('resume-pdf-root');
    if (!element) {
      alert('Preview element not found.');
      setExporting(false);
      return;
    }

    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo?.fullName || 'Resume'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setExporting(false);
      })
      .catch((err) => {
        console.error('PDF export error:', err);
        alert('An error occurred during PDF generation.');
        setExporting(false);
      });
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar
        onSave={handleSaveResume}
        onExport={handleExportPDF}
        saving={saving}
        exporting={exporting}
      />

      {/* Mobile Tab Toggle Bar */}
      <div className="mobile-tab-bar bg-slate-900/60 border border-white/5 mx-4 mt-4 p-1 rounded-xl flex">
        <button
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${mobileView === 'edit' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
        >
          Form & AI
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${mobileView === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
        >
          Resume Preview
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <main className="main-layout flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-[1920px] mx-auto w-full min-h-0">
        {/* Left Form / AI Column */}
        <div className={`form-column flex-1 flex flex-col gap-6 lg:w-[42%] min-w-0 ${mobileView === 'edit' ? 'flex' : 'hidden lg:flex'
          }`}>
          <ResumeForm
            resumeData={resumeData}
            onChange={handleFormChange}
          />
          <AISuggestions
            suggestions={suggestions}
            loading={aiLoading}
            onGetSuggestions={handleGetSuggestions}
          />
        </div>

        {/* Right Preview / Template Selector Column */}
        <div className={`preview-column flex-1 flex flex-col gap-6 lg:w-[58%] min-w-0 ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}>
          <TemplateSelector
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
          />

          <div className="preview-scroll-container bg-slate-900/40 border border-white/5 flex-1 flex justify-center items-start overflow-y-auto max-h-[820px] p-6 rounded-2xl">
            {/* Wrapper to control visual representation & spacing */}
            <div className="resume-paper-wrapper shadow-2xl transition-transform duration-300">
              <ResumePreview
                ref={previewRef}
                resumeData={resumeData}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
