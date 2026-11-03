import React, { useState } from 'react';
import { ModuleData, QuizQuestion } from '../data/tafsirData';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  ProgressState,
  evaluateQuizPerformance,
} from '../utils/progressStorage';

interface QuizViewProps {
  modules: ModuleData[];
  initialModuleId?: string;
  progress: ProgressState;
  onSaveQuizResult: (moduleId: string, score: number, total: number) => void;
  onBackToModules: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  modules,
  initialModuleId,
  progress,
  onSaveQuizResult,
  onBackToModules,
}) => {
  // Currently selected module for quiz
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || modules[0].id
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentModule =
    modules.find((m) => m.id === selectedModuleId) || modules[0];
  const questions: QuizQuestion[] = currentModule.quiz || [];
  const currentQuestion: QuizQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished
      const finalScore = selectedOption === currentQuestion.correctIndex ? score : score;
      setIsQuizCompleted(true);
      onSaveQuizResult(selectedModuleId, finalScore, questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const handleSwitchModule = (modId: string) => {
    setSelectedModuleId(modId);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const quizResultHistory = progress.quizScores[selectedModuleId];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Module Selector Pill Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pilih Modul Kuis:
          </label>
          {quizResultHistory && (
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Award className="h-3.5 w-3.5" /> Skor Terbaik: {quizResultHistory.percentage}%
            </span>
          )}
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => handleSwitchModule(mod.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedModuleId === mod.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Modul {mod.number}: {mod.title.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* QUIZ COMPLETED SCREEN */}
      {isQuizCompleted ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center space-y-5 shadow-lg animate-in zoom-in-95">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-md">
            <Award className="h-10 w-10" />
          </div>

          <div>
            <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">
              Evaluasi Hasil Kuis
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
              {currentModule.title}
            </h2>
          </div>

          {/* Score display */}
          {(() => {
            const pct = Math.round((score / questions.length) * 100);
            const evalInfo = evaluateQuizPerformance(pct);
            return (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/40 p-5 space-y-2 max-w-md mx-auto">
                <div className="text-4xl sm:text-5xl font-black text-emerald-800 dark:text-emerald-300">
                  {pct}%
                </div>
                <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Peringkat: {evalInfo.grade} ({score} dari {questions.length} Benar)
                </div>
                <p className="text-xs sm:text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                  {evalInfo.message}
                </p>
              </div>
            );
          })()}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Ulangi Kuis</span>
            </button>
            <button
              onClick={onBackToModules}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-700/20"
            >
              <BookOpen className="h-4 w-4" />
              <span>Kembali ke Materi</span>
            </button>
          </div>
        </div>
      ) : (
        /* QUIZ ACTIVE SCREEN */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Soal {currentQuestionIndex + 1} dari {questions.length}
              </span>
            </div>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Skor Sementara: {score} Poin
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, oIdx) => {
              let optStyle =
                'border-slate-200 dark:border-slate-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-300 text-slate-800 dark:text-slate-200';

              if (isAnswerSubmitted) {
                if (oIdx === currentQuestion.correctIndex) {
                  optStyle =
                    'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30';
                } else if (oIdx === selectedOption) {
                  optStyle =
                    'border-red-500 bg-red-50 dark:bg-red-950/70 text-red-900 dark:text-red-200 ring-2 ring-red-500/30';
                } else {
                  optStyle = 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${optStyle}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>

                  {isAnswerSubmitted && oIdx === currentQuestion.correctIndex && (
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && oIdx === selectedOption && oIdx !== currentQuestion.correctIndex && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div
              className={`rounded-2xl p-4 sm:p-5 border text-xs sm:text-sm animate-in fade-in space-y-2 ${
                selectedOption === currentQuestion.correctIndex
                  ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                  : 'border-red-200 bg-red-50/80 dark:border-red-900/60 dark:bg-red-950/40 text-red-950 dark:text-red-100'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Jawaban Anda Tepat Sekali!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Jawaban Kurang Tepat.</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>

              <div className="pt-2 border-t border-current/15 text-[11px] font-semibold opacity-75">
                📖 Rujukan: {currentQuestion.referenceSource}
              </div>
            </div>
          )}

          {/* Bottom Action: Next Question */}
          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 active:scale-98 transition-all"
              >
                <span>
                  {currentQuestionIndex + 1 === questions.length
                    ? 'Lihat Hasil Akhir'
                    : 'Pertanyaan Selanjutnya'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
