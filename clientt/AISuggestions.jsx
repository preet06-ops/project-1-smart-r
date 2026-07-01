import React from 'react';

/**
 * AISuggestions — Displays AI-powered resume improvement suggestions.
 * Shows shimmer loading state, empty state, and suggestion cards with priority badges.
 */

const priorityColors = {
  high: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

function ShimmerCard() {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 rounded-full shimmer" />
        <div className="h-5 w-12 rounded-full shimmer" />
      </div>
      <div className="h-4 w-3/4 rounded shimmer" />
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-5/6 rounded shimmer" />
      </div>
    </div>
  );
}

function SuggestionCard({ suggestion, index }) {
  const priority = (suggestion.priority || 'medium').toLowerCase();
  const colors = priorityColors[priority] || priorityColors.medium;

  return (
    <div
      className="suggestion-card glass rounded-xl p-4 animate-slide-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top row: section badge + priority */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
          {suggestion.section || 'General'}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors}`}>
          {priority}
        </span>
      </div>

      {/* Title */}
      {suggestion.title && (
        <h4 className="text-sm font-semibold text-white mb-1">{suggestion.title}</h4>
      )}

      {/* Body */}
      <p className="text-xs text-slate-400 leading-relaxed">
        {suggestion.text || suggestion.suggestion || suggestion.message || 'No details available.'}
      </p>
    </div>
  );
}

export default function AISuggestions({ suggestions = [], loading, onGetSuggestions }) {
  return (
    <div className="ai-suggestions no-print glass rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h3 className="text-sm font-bold text-white tracking-tight">AI Suggestions</h3>
        </div>
        <button
          onClick={onGetSuggestions}
          disabled={loading}
          className="btn-gradient px-4 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md shadow-violet-500/15 hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-1.5">
            {loading ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Get Suggestions
              </>
            )}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {loading && (
          <>
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </>
        )}

        {!loading && suggestions.length > 0 &&
          suggestions.map((s, i) => (
            <SuggestionCard key={i} suggestion={s} index={i} />
          ))
        }

        {!loading && suggestions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4 animate-float">
              <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Click to get AI-powered suggestions to improve your resume
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
