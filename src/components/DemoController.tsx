import React from 'react';
import { useData } from '../context/DataContext';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X, MessageSquare, Subtitles } from 'lucide-react';

export const DemoController: React.FC = () => {
  const {
    demoState,
    startDemo,
    pauseDemo,
    resumeDemo,
    nextDemoStep,
    prevDemoStep,
    stopDemo,
    togglePresenterMode,
    isPresenterMode,
    isVideoMode,
  } = useData();

  if (!demoState.isRunning) {
    return null;
  }

  const { currentStep, currentStepIndex, totalSteps, isPaused } = demoState;

  return (
    <aside
      aria-label="AquaMind Guided Demo Controller"
      className={`fixed z-50 transition-all duration-300 ${
      isVideoMode
        ? 'bottom-6 left-12 right-12'
        : 'bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[680px]'
    }`}>
      {/* Speaker Notes Floating Drawer (Presenter Mode) */}
      {isPresenterMode && (
        <div className="mb-2 p-3 bg-amber-50 border border-amber-300 rounded-xl shadow-lg text-amber-900 text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-amber-200 font-bold">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              Presenter Speaker Notes — Step {currentStep.stepIndex} of {totalSteps}
            </span>
            <span className="text-[10px] text-amber-700 font-mono">atomQUEST 2026</span>
          </div>
          <p className="leading-relaxed">{currentStep.speakerNotes}</p>
        </div>
      )}

      {/* Main Broadcast Caption & Controller Dock */}
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-4 text-white">
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-brand-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Caption & Headline */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-wider">
                <Subtitles className="w-3 h-3 text-brand-300" />
                Step {currentStep.stepIndex}/{totalSteps}
              </span>
              <h3 className="text-sm font-bold text-slate-100 truncate">{currentStep.headline}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans pr-2">
              "{currentStep.narration}"
            </p>
          </div>

          {/* Action Button Controls */}
          {!isVideoMode ? (
            <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
              <button
                onClick={prevDemoStep}
                disabled={currentStepIndex === 0}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-800 transition"
                title="Previous Scene"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {isPaused ? (
                <button
                  onClick={resumeDemo}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
                  title="Resume Scenario"
                  aria-label="Resume guided scenario"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={pauseDemo}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
                  title="Pause Scenario"
                  aria-label="Pause guided scenario"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  Pause
                </button>
              )}

              <button
                onClick={nextDemoStep}
                disabled={currentStepIndex === totalSteps - 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-800 transition"
                title="Next Scene"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={startDemo}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition ml-1"
                title="Restart from Scene 1"
                aria-label="Restart demo from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePresenterMode}
                className={`p-1.5 rounded-lg transition ${
                  isPresenterMode
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Toggle Speaker Notes"
                aria-label="Toggle presenter notes"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              <button
                onClick={stopDemo}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 transition ml-1"
                title="Exit Demo Scenario"
                aria-label="Close demo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* In video mode, show a clean indicator */
            <div className="shrink-0 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">REC 1080P</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
