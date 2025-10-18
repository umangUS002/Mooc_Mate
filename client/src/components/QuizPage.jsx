import React, { useState, useEffect } from "react";

export default function QuizPage({ questions, learningMode, onRestart }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [incorrectQs, setIncorrectQs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(learningMode ? null : 600); // 10 min timer for test mode

  const current = questions[index];

  // Timer countdown (only for test mode)
  useEffect(() => {
    if (!learningMode && !showResults && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [learningMode, showResults, timeLeft]);

  const handleSelect = (i) => {
    setSelected(i);
    if (learningMode) {
      if (i === current.correctIndex) setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!learningMode && selected !== null) {
      if (selected === current.correctIndex) {
        setScore((prev) => prev + 1);
      } else {
        setIncorrectQs((prev) => [...prev, current]);
      }
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResults(true);
    }
  };

  // Format time (mm:ss)
  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  // Retry incorrect questions
  const handleRetryIncorrect = () => {
    if (incorrectQs.length > 0) {
      setShowResults(false);
      setShowReview(false);
      setQuestions(incorrectQs);
      setIndex(0);
      setScore(0);
      setSelected(null);
      setIncorrectQs([]);
      setTimeLeft(learningMode ? null : 600);
    }
  };

  // Show all answers view
  if (showReview) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-left">
        <h2 className="text-2xl font-semibold mb-4">Answer Review</h2>
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4 p-3 border rounded bg-gray-50">
            <p className="font-semibold">
              Q{idx + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => (
              <div
                key={i}
                className={`ml-2 ${
                  i === q.correctIndex ? "text-green-600 font-semibold" : ""
                }`}
              >
                • {opt}
              </div>
            ))}
            <p className="text-sm mt-1 text-gray-700">
              🧠 {q.explanation}
            </p>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Show results summary
  if (showResults)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Quiz Completed!</h2>
        <p className="text-lg mb-4">
          Your Score: {score} / {questions.length}
        </p>

        {!learningMode && (
          <>
            <button
              onClick={() => setShowReview(true)}
              className="mr-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Show All Answers
            </button>

            {incorrectQs.length > 0 && (
              <button
                onClick={handleRetryIncorrect}
                className="bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Retry Incorrect Questions ({incorrectQs.length})
              </button>
            )}
          </>
        )}

        <div>
          <button
            onClick={onRestart}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  // Progress bar calculation
  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-700">
          Question {index + 1} of {questions.length}
        </p>
        {!learningMode && (
          <p className="font-semibold text-red-600">
            ⏱ {formatTime(timeLeft)}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Q{index + 1}. {current.question}
      </h3>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`block w-full text-left border p-2 rounded ${
              selected === i ? "bg-blue-100 border-blue-400" : "bg-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {learningMode && selected !== null && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          {selected === current.correctIndex ? "✅ Correct!" : "❌ Incorrect!"}
          <p className="text-sm mt-1">{current.explanation}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {index + 1 < questions.length ? "Next" : "Finish"}
      </button>
    </div>
  );
}
