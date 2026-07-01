import React, { useState } from 'react';

/**
 * ResumeForm — Renders a multi-section form with tabs for Personal Info,
 * Experience, Education, Skills, Projects, and Certifications.
 */
export default function ResumeForm({ resumeData, onChange }) {
  const [activeFormTab, setActiveFormTab] = useState('personal');

  const tabs = [
    { id: 'personal', name: 'Personal' },
    { id: 'experience', name: 'Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'certifications', name: 'Certifications' }
  ];

  // Helper to handle nested field changes
  const updatePersonalInfo = (field, value) => {
    onChange('personalInfo', {
      ...resumeData.personalInfo,
      [field]: value
    });
  };

  // Helper for list-based sections (experience, education, skills, projects, certifications)
  const updateListItem = (section, index, field, value) => {
    const list = [...(resumeData[section] || [])];
    list[index] = { ...list[index], [field]: value };
    onChange(section, list);
  };

  const addListItem = (section, defaultObj) => {
    const list = [...(resumeData[section] || [])];
    onChange(section, [...list, defaultObj]);
  };

  const removeListItem = (section, index) => {
    const list = [...(resumeData[section] || [])];
    list.splice(index, 1);
    onChange(section, list);
  };

  return (
    <div className="resume-form glass rounded-2xl p-5 flex-1 flex flex-col min-h-0">
      {/* Form Section Tabs */}
      <div className="tab-bar border-b border-white/10 flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeFormTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFormTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-all duration-200 relative ${
                isActive ? 'text-indigo-400 tab-active-indicator' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Form Content area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[600px]">
        {/* PERSONAL INFO */}
        {activeFormTab === 'personal' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.fullName || ''}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo?.email || ''}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.phone || ''}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.location || ''}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">LinkedIn</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">GitHub</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/johndoe"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Website</label>
                <input
                  type="text"
                  value={resumeData.personalInfo?.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="johndoe.dev"
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Professional Summary</label>
              <textarea
                rows={4}
                value={resumeData.personalInfo?.summary || ''}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Results-oriented Software Engineer with 5+ years of experience building web applications..."
                className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300 resize-none"
              />
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeFormTab === 'experience' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Work Experience</h3>
              <button
                type="button"
                onClick={() => addListItem('experience', { jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                + Add Job
              </button>
            </div>

            {(!resumeData.experience || resumeData.experience.length === 0) ? (
              <p className="text-xs text-slate-500 text-center py-6">No experience added yet.</p>
            ) : (
              resumeData.experience.map((exp, index) => (
                <div key={index} className="form-entry relative p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 animate-slide-in">
                  <button
                    type="button"
                    onClick={() => removeListItem('experience', index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Job Title</label>
                      <input
                        type="text"
                        value={exp.jobTitle || ''}
                        onChange={(e) => updateListItem('experience', index, 'jobTitle', e.target.value)}
                        placeholder="Frontend Engineer"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => updateListItem('experience', index, 'company', e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => updateListItem('experience', index, 'location', e.target.value)}
                        placeholder="Remote / New York, NY"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div className="flex items-end pb-3.5">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current || false}
                          onChange={(e) => updateListItem('experience', index, 'current', e.target.checked)}
                          className="rounded border-slate-700 text-indigo-600 bg-slate-850 focus:ring-indigo-500/20"
                        />
                        <span>I currently work here</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) => updateListItem('experience', index, 'startDate', e.target.value)}
                        placeholder="Jan 2023"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    {!exp.current && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate || ''}
                          onChange={(e) => updateListItem('experience', index, 'endDate', e.target.value)}
                          placeholder="Present / Dec 2024"
                          className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                    <textarea
                      rows={3}
                      value={exp.description || ''}
                      onChange={(e) => updateListItem('experience', index, 'description', e.target.value)}
                      placeholder="Collaborated with designers to implement React applications. Improved site performance by 30%..."
                      className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* EDUCATION */}
        {activeFormTab === 'education' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Education</h3>
              <button
                type="button"
                onClick={() => addListItem('education', { degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '', description: '' })}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                + Add Education
              </button>
            </div>

            {(!resumeData.education || resumeData.education.length === 0) ? (
              <p className="text-xs text-slate-500 text-center py-6">No education added yet.</p>
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="form-entry relative p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 animate-slide-in">
                  <button
                    type="button"
                    onClick={() => removeListItem('education', index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Degree / Program</label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => updateListItem('education', index, 'degree', e.target.value)}
                        placeholder="B.S. in Computer Science"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Institution</label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => updateListItem('education', index, 'institution', e.target.value)}
                        placeholder="State University"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={edu.location || ''}
                        onChange={(e) => updateListItem('education', index, 'location', e.target.value)}
                        placeholder="Boston, MA"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Start Date</label>
                      <input
                        type="text"
                        value={edu.startDate || ''}
                        onChange={(e) => updateListItem('education', index, 'startDate', e.target.value)}
                        placeholder="Sep 2018"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">End Date</label>
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) => updateListItem('education', index, 'endDate', e.target.value)}
                        placeholder="May 2022"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateListItem('education', index, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description (Optional)</label>
                      <input
                        type="text"
                        value={edu.description || ''}
                        onChange={(e) => updateListItem('education', index, 'description', e.target.value)}
                        placeholder="Relevant coursework: Data Structures, Web Systems"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SKILLS */}
        {activeFormTab === 'skills' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skills</h3>
              <button
                type="button"
                onClick={() => addListItem('skills', { category: '', items: '' })}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                + Add Category
              </button>
            </div>

            {(!resumeData.skills || resumeData.skills.length === 0) ? (
              <p className="text-xs text-slate-500 text-center py-6">No skills added yet.</p>
            ) : (
              resumeData.skills.map((skill, index) => (
                <div key={index} className="form-entry relative p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 animate-slide-in">
                  <button
                    type="button"
                    onClick={() => removeListItem('skills', index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
                      <input
                        type="text"
                        value={skill.category || ''}
                        onChange={(e) => updateListItem('skills', index, 'category', e.target.value)}
                        placeholder="Languages"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Items (comma separated)</label>
                      <input
                        type="text"
                        value={skill.items || ''}
                        onChange={(e) => updateListItem('skills', index, 'items', e.target.value)}
                        placeholder="JavaScript, TypeScript, Python, HTML/CSS"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROJECTS */}
        {activeFormTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Projects</h3>
              <button
                type="button"
                onClick={() => addListItem('projects', { name: '', description: '', technologies: '', link: '' })}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                + Add Project
              </button>
            </div>

            {(!resumeData.projects || resumeData.projects.length === 0) ? (
              <p className="text-xs text-slate-500 text-center py-6">No projects added yet.</p>
            ) : (
              resumeData.projects.map((proj, index) => (
                <div key={index} className="form-entry relative p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 animate-slide-in">
                  <button
                    type="button"
                    onClick={() => removeListItem('projects', index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Project Name</label>
                      <input
                        type="text"
                        value={proj.name || ''}
                        onChange={(e) => updateListItem('projects', index, 'name', e.target.value)}
                        placeholder="E-Commerce Platform"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Project Link (Optional)</label>
                      <input
                        type="text"
                        value={proj.link || ''}
                        onChange={(e) => updateListItem('projects', index, 'link', e.target.value)}
                        placeholder="github.com/johndoe/project"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Technologies Used</label>
                    <input
                      type="text"
                      value={proj.technologies || ''}
                      onChange={(e) => updateListItem('projects', index, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB, Tailwind"
                      className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description || ''}
                      onChange={(e) => updateListItem('projects', index, 'description', e.target.value)}
                      placeholder="Built a full-stack e-commerce app with Stripe integration. Optimized DB queries to improve response time by 40%..."
                      className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeFormTab === 'certifications' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Certifications</h3>
              <button
                type="button"
                onClick={() => addListItem('certifications', { name: '', issuer: '', date: '', link: '' })}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                + Add Cert
              </button>
            </div>

            {(!resumeData.certifications || resumeData.certifications.length === 0) ? (
              <p className="text-xs text-slate-500 text-center py-6">No certifications added yet.</p>
            ) : (
              resumeData.certifications.map((cert, index) => (
                <div key={index} className="form-entry relative p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 animate-slide-in">
                  <button
                    type="button"
                    onClick={() => removeListItem('certifications', index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name || ''}
                        onChange={(e) => updateListItem('certifications', index, 'name', e.target.value)}
                        placeholder="AWS Solutions Architect"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Issuer</label>
                      <input
                        type="text"
                        value={cert.issuer || ''}
                        onChange={(e) => updateListItem('certifications', index, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Date Earned</label>
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => updateListItem('certifications', index, 'date', e.target.value)}
                        placeholder="March 2024"
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Verify Link (Optional)</label>
                      <input
                        type="text"
                        value={cert.link || ''}
                        onChange={(e) => updateListItem('certifications', index, 'link', e.target.value)}
                        placeholder="credly.com/certs/..."
                        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
