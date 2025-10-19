"use client";

import { useState, useEffect } from "react";

export default function QuizPage({
  questions,
  learningMode,
  onRestart,
  selectedWeeks,
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [incorrectQs, setIncorrectQs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(learningMode ? null : 0);
  const [questionSet, setQuestionSet] = useState(questions);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [viewedQuestions, setViewedQuestions] = useState(new Set([0]));

  const current = questionSet[index];

  useEffect(() => {
    setViewedQuestions((prev) => new Set([...prev, index]));
  }, [index]);

  // Timer countdown (only for test mode)
  const MAX_TIME = 1800; // e.g., stop at 60 seconds

useEffect(() => {
  if (!learningMode && !showResults && timeLeft < MAX_TIME) {
    const timer = setInterval(() => setTimeLeft((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  } else if (timeLeft >= MAX_TIME) {
    setShowResults(true);
  }
}, [learningMode, showResults, timeLeft]);

  // Helper: record answer only once per question
  const recordAnswerOnce = (qIndex, selectedIdx) => {
    // If already answered, do nothing (prevents double counting)
    if (answeredQuestions[qIndex] !== undefined) return;

    setAnsweredQuestions((prev) => ({
      ...prev,
      [qIndex]: selectedIdx,
    }));

    const q = questionSet[qIndex];
    if (!q) return;

    if (selectedIdx === q.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrectQs((prev) => [...prev, q]);
    }
  };

  const handleSelect = (i) => {
    if (answeredQuestions[index] !== undefined) return;

    setSelected(i);

    // In learning mode we want immediate feedback and count, but only once
    if (learningMode) {
      recordAnswerOnce(index, i);
    }
  };

  const handleNext = () => {
    // In test mode, record the answer for scoring (only if user selected)
    if (!learningMode && selected !== null) {
      recordAnswerOnce(index, selected);
    }

    // ensure answeredQuestions stores selection for navigation
    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }));
    }

    if (index + 1 < questionSet.length) {
      setIndex(index + 1);
      // restore previous answer if exists
      setSelected(answeredQuestions[index + 1] ?? null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    // store current selection before going back
    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }));
    }
    if (index > 0) {
      setIndex(index - 1);
      setSelected(answeredQuestions[index - 1] ?? null);
    }
  };

  const handleJumpToQuestion = (questionIndex) => {
    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }));
    }
    setIndex(questionIndex);
    setSelected(answeredQuestions[questionIndex] ?? null);
  };

  const handleSubmit = () => {
    if (selected !== null) {
      recordAnswerOnce(index, selected);
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }));
    }
    // move next (or finish if last)
    if (index + 1 < questionSet.length) {
      setIndex(index + 1);
      setSelected(answeredQuestions[index + 1] ?? null);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    // If they finish without submitting current question, record it
    if (selected !== null) {
      recordAnswerOnce(index, selected);
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }));
    }
    setShowResults(true);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleRetryIncorrect = () => {
    if (incorrectQs.length > 0) {
      setShowResults(false);
      setShowReview(false);
      setQuestionSet(incorrectQs);
      setIndex(0);
      setScore(0);
      setSelected(null);
      setIncorrectQs([]);
      setTimeLeft(learningMode ? null : 600);
      setAnsweredQuestions({});
      setViewedQuestions(new Set([0]));
    }
  };

  if (showReview) {
    return (
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
        }}
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      >
        <div className="w-full max-w-4xl">
          <div className="backdrop-blur-lg bg-black/30 p-6 sm:p-8 rounded-2xl border border-purple-800/40 shadow-[0_0_40px_rgba(138,43,226,0.25)]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">
              Answer Review
            </h2>
            <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-sm bg-purple-900/20 p-4 sm:p-5 border border-purple-700/40 rounded-xl hover:border-purple-600/60 transition-all"
                >
                  <p className="font-semibold text-purple-200 mb-3 text-sm sm:text-base">
                    Q{idx + 1}. {q.question}
                  </p>
                  <div className="space-y-2 mb-3">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`ml-4 text-xs sm:text-sm ${
                          i === q.correctIndex
                            ? "text-green-400 font-semibold"
                            : "text-gray-300"
                        }`}
                      >
                        <span className="inline-block w-5 h-5 rounded-full border border-current mr-2 text-center leading-4 text-xs">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-xs sm:text-sm text-purple-300">
                      <span className="font-semibold">💡 Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={onRestart}
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questionSet.length) * 100);
    return (
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
        }}
        className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      >
        <div className="w-full max-w-md">
          <div className="backdrop-blur-lg bg-black/30 p-6 sm:p-8 rounded-2xl border border-purple-800/40 shadow-[0_0_40px_rgba(138,43,226,0.25)] text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Quiz Completed! 🎉
            </h2>
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-gray-300">Your Score</p>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {score}/{questionSet.length}
              </p>
              <p className="text-base sm:text-lg text-purple-300 font-semibold">
                {percentage}% Correct
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => setShowReview(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
              >
                📖 Review All Answers
              </button>

              {!learningMode && incorrectQs.length > 0 && (
                <button
                  onClick={handleRetryIncorrect}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.7)]"
                >
                  🔄 Retry Incorrect ({incorrectQs.length})
                </button>
              )}
            </div>

            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
      }}
      className="min-h-screen flex flex-col"
    >
      {/* Header - Made responsive with stacked layout on mobile */}
      <div className="backdrop-blur-lg bg-black/30 border-b border-purple-800/40 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-2xl font-bold text-white">
          Quiz -{" "}
          {selectedWeeks?.length === 12
            ? "All Weeks"
            : selectedWeeks?.length > 1
            ? `Weeks ${selectedWeeks.join(", ")}`
            : `Week ${selectedWeeks?.[0] || "1"}`}
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {!learningMode && (
            <div className="text-sm sm:text-lg font-semibold text-red-400 bg-red-500/10 px-3 sm:px-4 py-2 rounded-full border border-red-500/30">
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
          <button
            onClick={handleFinish}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-white"
          >
            Finish Exam
          </button>
        </div>
      </div>

      {/* Main Content - Stacked vertically on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Question Palette - Hidden on mobile, shown on lg screens */}
        <div className="hidden lg:block w-64 backdrop-blur-lg bg-black/20 border-r border-purple-800/40 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-purple-300 mb-4 uppercase tracking-wide">
                Questions
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {questionSet.map((_, qIndex) => {
                  const isAnswered = answeredQuestions[qIndex] !== undefined;
                  const isViewed = viewedQuestions.has(qIndex);
                  let bgColor =
                    "bg-black/40 text-gray-300 border-purple-700/40";
                  let borderColor = "border-purple-700/40";

                  if (isAnswered) {
                    bgColor =
                      "bg-green-500/20 text-green-300 border-green-500/50";
                    borderColor = "border-green-500/50";
                  } else if (isViewed) {
                    bgColor = "bg-red-500/20 text-red-300 border-red-500/50";
                    borderColor = "border-red-500/50";
                  }

                  return (
                    <button
                      key={qIndex}
                      onClick={() => handleJumpToQuestion(qIndex)}
                      className={`w-12 h-12 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center border ${
                        qIndex === index
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 ring-2 ring-purple-400/50 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                          : `${bgColor} hover:border-purple-600/60 hover:bg-black/60`
                      }`}
                    >
                      {qIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Question Display - Full width on mobile, flex-1 on desktop */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">
                Q{index + 1}. {current.question}
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {current.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === current.correctIndex;
                const isWrongSelected =
                  selected !== null &&
                  selected !== current.correctIndex &&
                  learningMode;
                const shouldGlow = isWrongSelected && isCorrect;
                const isLocked = answeredQuestions[index] !== undefined;

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isLocked}
                    className={`w-full text-left border-2 p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 backdrop-blur-sm ${
                      shouldGlow
                        ? "bg-gradient-to-r from-green-600/40 to-green-500/40 border-green-400 text-white shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-pulse"
                        : isSelected
                        ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        : isLocked
                        ? "bg-black/40 border-purple-700/40 text-gray-400 cursor-not-allowed opacity-60"
                        : "bg-black/40 border-purple-700/40 text-gray-100 hover:bg-black/60 hover:border-purple-600/60"
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 text-center leading-5 text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {learningMode && selected !== null && (
              <div
                className={`mb-6 sm:mb-8 p-4 rounded-lg border backdrop-blur-sm text-sm sm:text-base ${
                  selected === current.correctIndex
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-red-500/10 border-red-500/40"
                }`}
              >
                {selected === current.correctIndex ? (
                  <p className="text-green-400 font-medium mb-2">✅ Correct!</p>
                ) : (
                  <p className="text-red-400 font-medium mb-2">
                    ❌ Incorrect! The correct answer is highlighted above.
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-300">
                  {current.explanation}
                </p>
              </div>
            )}

            {/* Mobile Question Palette - Shown only on mobile screens */}
            <div className="lg:hidden mb-6 sm:mb-8 p-4 backdrop-blur-sm bg-purple-900/20 rounded-lg border border-purple-700/40">
              <h3 className="text-xs font-semibold text-purple-300 mb-3 uppercase tracking-wide">
                Questions
              </h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {questionSet.map((_, qIndex) => {
                  const isAnswered = answeredQuestions[qIndex] !== undefined;
                  const isViewed = viewedQuestions.has(qIndex);
                  let bgColor =
                    "bg-black/40 text-gray-300 border-purple-700/40";

                  if (isAnswered) {
                    bgColor =
                      "bg-green-500/20 text-green-300 border-green-500/50";
                  } else if (isViewed) {
                    bgColor = "bg-red-500/20 text-red-300 border-red-500/50";
                  }

                  return (
                    <button
                      key={qIndex}
                      onClick={() => handleJumpToQuestion(qIndex)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center border ${
                        qIndex === index
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 ring-2 ring-purple-400/50 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                          : `${bgColor} hover:border-purple-600/60 hover:bg-black/60`
                      }`}
                    >
                      {qIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation*/}
      <div className="backdrop-blur-lg bg-black/30 border-t border-purple-800/40 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <button
          onClick={handlePrevious}
          disabled={index === 0}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 border ${
            index === 0
              ? "bg-black/40 text-gray-500 cursor-not-allowed border-gray-700/40"
              : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border-slate-500/40 shadow-[0_0_15px_rgba(71,85,105,0.4)] hover:shadow-[0_0_25px_rgba(71,85,105,0.6)]"
          }`}
        >
          ← Previous
        </button>

        <span className="text-xs sm:text-sm font-medium text-purple-300 order-3 sm:order-none">
          Question {index + 1} of {questionSet.length}
        </span>

        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto order-2 sm:order-none">
          <button
            onClick={handleSubmit}
            disabled={
              selected === null || answeredQuestions[index] !== undefined
            }
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 border ${
              selected === null || answeredQuestions[index] !== undefined
                ? "bg-black/40 text-gray-500 cursor-not-allowed border-gray-700/40"
                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
            }`}
          >
            Submit
          </button>

          <button
            onClick={handleNext}
            disabled={index === questionSet.length - 1}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 border ${
              index === questionSet.length - 1
                ? "bg-black/40 text-gray-500 cursor-not-allowed border-gray-700/40"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
