import React from 'react';

/**
 * TemplateSelector — Horizontal card selector for choosing resume templates.
 * Each card shows a miniature visual representation of the layout.
 */

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean & traditional',
    // Mini layout preview colors
    preview: 'professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column sidebar',
    preview: 'modern',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Maximum whitespace',
    preview: 'minimal',
  },
];

function MiniPreview({ type }) {
  if (type === 'professional') {
    return (
      <div className="w-full h-full bg-white rounded-sm p-2 flex flex-col gap-1">
        {/* Header */}
        <div className="h-2.5 w-14 bg-slate-800 rounded-sm" />
        <div className="flex gap-1">
          <div className="h-1 w-8 bg-slate-300 rounded-sm" />
          <div className="h-1 w-6 bg-slate-300 rounded-sm" />
          <div className="h-1 w-7 bg-slate-300 rounded-sm" />
        </div>
        <div className="h-px w-full bg-slate-300 my-0.5" />
        {/* Section */}
        <div className="h-1.5 w-10 bg-slate-700 rounded-sm" />
        <div className="h-1 w-full bg-slate-200 rounded-sm" />
        <div className="h-1 w-full bg-slate-200 rounded-sm" />
        <div className="h-1 w-3/4 bg-slate-200 rounded-sm" />
        <div className="h-px w-full bg-slate-300 my-0.5" />
        <div className="h-1.5 w-8 bg-slate-700 rounded-sm" />
        <div className="h-1 w-full bg-slate-200 rounded-sm" />
        <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
      </div>
    );
  }

  if (type === 'modern') {
    return (
      <div className="w-full h-full bg-white rounded-sm flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-violet-700 p-1.5 flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-white/30 mx-auto" />
          <div className="h-1.5 w-full bg-white/40 rounded-sm" />
          <div className="h-1 w-3/4 bg-white/25 rounded-sm" />
          <div className="h-1 w-full bg-white/25 rounded-sm" />
          <div className="mt-auto" />
          <div className="h-1 w-full bg-white/20 rounded-sm" />
          <div className="h-1 w-full bg-white/20 rounded-sm" />
        </div>
        {/* Main */}
        <div className="flex-1 p-1.5 flex flex-col gap-1">
          <div className="h-1.5 w-10 bg-slate-700 rounded-sm" />
          <div className="h-1 w-full bg-slate-200 rounded-sm" />
          <div className="h-1 w-full bg-slate-200 rounded-sm" />
          <div className="h-1 w-3/4 bg-slate-200 rounded-sm" />
          <div className="mt-1" />
          <div className="h-1.5 w-8 bg-slate-700 rounded-sm" />
          <div className="h-1 w-full bg-slate-200 rounded-sm" />
          <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
        </div>
      </div>
    );
  }

  // Minimal
  return (
    <div className="w-full h-full bg-white rounded-sm p-3 flex flex-col items-center gap-1.5">
      <div className="h-3 w-16 bg-slate-800 rounded-sm" />
      <div className="flex gap-2">
        <div className="h-0.5 w-5 bg-slate-300 rounded-sm" />
        <div className="h-0.5 w-5 bg-slate-300 rounded-sm" />
      </div>
      <div className="h-px w-8 bg-indigo-400 my-0.5" />
      <div className="h-1 w-full bg-slate-100 rounded-sm" />
      <div className="h-1 w-full bg-slate-100 rounded-sm" />
      <div className="h-1 w-3/4 bg-slate-100 rounded-sm" />
      <div className="mt-1" />
      <div className="h-1 w-full bg-slate-100 rounded-sm" />
      <div className="h-1 w-5/6 bg-slate-100 rounded-sm" />
    </div>
  );
}

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="template-selector no-print flex gap-3">
      {templates.map((tpl) => {
        const isSelected = selected === tpl.id;
        return (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`template-card flex-1 rounded-xl overflow-hidden transition-all duration-300 ${
              isSelected
                ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/20'
                : 'glass hover:bg-white/10'
            }`}
          >
            <div className="p-3">
              {/* Mini Preview */}
              <div className="w-full h-20 rounded-lg overflow-hidden mb-2.5 ring-1 ring-black/10">
                <MiniPreview type={tpl.preview} />
              </div>
              {/* Label */}
              <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {tpl.name}
              </p>
              <p className="text-[11px] text-slate-500">{tpl.description}</p>
            </div>
            {/* Active indicator bar */}
            {isSelected && (
              <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
