"use client"

import { useState, useEffect, useRef } from "react"

export default function QuizPage({ questions, learningMode, onRestart, selectedWeeks }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [incorrectQs, setIncorrectQs] = useState([])
  const [questionSet, setQuestionSet] = useState(questions)
  const [answeredQuestions, setAnsweredQuestions] = useState({})
  const [viewedQuestions, setViewedQuestions] = useState(new Set([0]))
  const [timeLeft, setTimeLeft] = useState(null)
  const sliderRef = useRef(null)

  const current = questionSet[index]

  // Calculate timer based on number of questions (10 questions per week = 1 minute per question)
  useEffect(() => {
    if (!learningMode) {
      const numQuestions = questions?.length || 10
      const numWeeks = Math.ceil(numQuestions / 10)
      const timeInMinutes = numWeeks * 10
      const timeInSeconds = timeInMinutes * 60
      setTimeLeft(timeInSeconds)
    }
  }, [questions, learningMode])

  useEffect(() => {
    setViewedQuestions((prev) => new Set([...prev, index]))
  }, [index])

  useEffect(() => {
    if (!learningMode && !showResults && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      setShowResults(true)
    }
  }, [learningMode, showResults, timeLeft])

  useEffect(() => {
    if (sliderRef.current) {
      const currentButton = sliderRef.current.querySelector(`[data-question="${index}"]`)
      if (currentButton) {
        currentButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [index])

  const recordAnswerOnce = (qIndex, selectedIdx) => {
    if (answeredQuestions[qIndex] !== undefined) return

    setAnsweredQuestions((prev) => ({
      ...prev,
      [qIndex]: selectedIdx,
    }))

    const q = questionSet[qIndex]
    if (!q) return

    if (selectedIdx === q.correctIndex) {
      setScore((prev) => prev + 1)
    } else {
      setIncorrectQs((prev) => [...prev, q])
    }
  }

  const handleSelect = (i) => {
    if (answeredQuestions[index] !== undefined) return

    setSelected(i)

    if (learningMode) {
      recordAnswerOnce(index, i)
    }
  }

  const handleNext = () => {
    if (!learningMode && selected !== null) {
      recordAnswerOnce(index, selected)
    }

    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }))
    }

    if (index + 1 < questionSet.length) {
      setIndex(index + 1)
      setSelected(answeredQuestions[index + 1] ?? null)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }))
    }
    if (index > 0) {
      setIndex(index - 1)
      setSelected(answeredQuestions[index - 1] ?? null)
    }
  }

  const handleJumpToQuestion = (questionIndex) => {
    if (selected !== null) {
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }))
    }
    setIndex(questionIndex)
    setSelected(answeredQuestions[questionIndex] ?? null)
  }

  const handleSubmit = () => {
    if (selected !== null) {
      recordAnswerOnce(index, selected)
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }))
    }

    if (index + 1 < questionSet.length) {
      setIndex(index + 1)
      setSelected(answeredQuestions[index + 1] ?? null)
    } else {
      setShowResults(true)
    }
  }

  const handleFinish = () => {
    if (selected !== null) {
      recordAnswerOnce(index, selected)
      setAnsweredQuestions((prev) => ({
        ...prev,
        [index]: selected,
      }))
    }
    setShowResults(true)
  }

  const formatTime = (t) => {
    const m = Math.floor(t / 60)
    const s = t % 60
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  if (showReview) {
    return (
      <div
        style={{
          background: "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
        }}
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="w-full max-w-4xl">
          <div className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl border border-purple-800/40 shadow-[0_0_40px_rgba(138,43,226,0.25)]">
            <h2 className="text-3xl font-bold mb-8 text-white text-center">Answer Review</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-sm bg-purple-900/20 p-5 border border-purple-700/40 rounded-xl hover:border-purple-600/60 transition-all"
                >
                  <p className="font-semibold text-purple-200 mb-3">
                    Q{idx + 1}. {q.question}
                  </p>
                  <div className="space-y-2 mb-3">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`ml-4 text-sm ${
                          i === q.correctIndex ? "text-green-400 font-semibold" : "text-gray-300"
                        }`}
                      >
                        <span className="inline-block w-5 h-5 rounded-full border border-current mr-2 text-center leading-4 text-xs">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={onRestart}
                className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / questionSet.length) * 100)
    return (
      <div
        style={{
          background: "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
        }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md">
          <div className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl border border-purple-800/40 shadow-[0_0_40px_rgba(138,43,226,0.25)] text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">Quiz Completed!</h2>
            <div className="space-y-2">
              <p className="text-lg text-gray-300">Your Score</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {score}/{questionSet.length}
              </p>
              <p className="text-lg text-purple-300 font-semibold">{percentage}% Correct</p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => setShowReview(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
              >
                📖 Review All Answers
              </button>
            </div>

            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)",
      }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <div className="backdrop-blur-lg bg-black/30 border-b border-purple-800/40 px-4 py-4 max-sm:py-2">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-lg font-bold text-white">
            Quiz -{" "}
            {selectedWeeks?.length === 12
              ? "All Weeks"
              : selectedWeeks?.length > 1
                ? `Weeks ${selectedWeeks.join(", ")}`
                : `Week ${selectedWeeks?.[0] || "1"}`}
          </h1>

          <div className="flex items-center gap-4">
            {!learningMode && timeLeft !== null && (
              <div className="text-lg max-sm:text-xs font-semibold text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30">
                ⏱ {formatTime(timeLeft)}
              </div>
            )}
            <button
              onClick={handleFinish}
              className="px-6 max-sm:px-3 max-sm:text-sm py-2 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-white"
            >
              Finish Exam
            </button>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-lg bg-black/20 border-b border-purple-800/40 px-12 py-4 max-sm:py-2 overflow-x-auto scroll-hide">
        <div ref={sliderRef} className="flex gap-3 min-w-min max-w-6xl mx-auto px-4 max-sm:px-2 items-center justify-center">
          {questionSet.map((_, qIndex) => {
            const isAnswered = answeredQuestions[qIndex] !== undefined
            const isViewed = viewedQuestions.has(qIndex)
            let bgColor = "bg-black/40 text-gray-300 border-purple-700/40"

            if (isAnswered) {
              bgColor = "bg-green-500/20 text-green-300 border-green-500/50"
            } else if (isViewed) {
              bgColor = "bg-red-500/20 text-red-300 border-red-500/50"
            }

            return (
              <button
                key={qIndex}
                data-question={qIndex}
                onClick={() => handleJumpToQuestion(qIndex)}
                className={`w-12 h-12 max-sm:h-8 max-sm:w-8 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center border flex-shrink-0 ${
                  qIndex === index
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-400 ring-2 ring-blue-400/50 scale-110 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                    : `${bgColor} hover:border-purple-600/60 hover:bg-black/60`
                }`}
              >
                {qIndex + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-3xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl max-sm:text-xl font-bold mb-6 max-sm:mb-3 text-white">
              Q{index + 1}. {current.question}
            </h2>
          </div>

          <div className="space-y-4 max-sm:space-y-2 mb-8 max-sm:mb-4">
            {current.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === current.correctIndex
              const isWrongSelected = selected !== null && selected !== current.correctIndex && learningMode
              const shouldGlow = isWrongSelected && isCorrect
              const isLocked = answeredQuestions[index] !== undefined

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isLocked}
                  className={`w-full text-left border-2 p-4 max-sm:py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm ${
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
              )
            })}
          </div>

          {learningMode && selected !== null && (
            <div
              className={`mb-8 p-4 max-sm:py-1 max-sm:mb-0 text-center rounded-lg border backdrop-blur-sm ${
                selected === current.correctIndex
                  ? "bg-green-500/10 border-green-500/40"
                  : "bg-red-500/10 border-red-500/40"
              }`}
            >
              {selected === current.correctIndex ? (
                <p className="text-green-400 font-medium mb-2">✅ Correct!</p>
              ) : (
                <p className="text-red-400 font-medium mb-2">❌ Incorrect! The correct answer is highlighted above.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="backdrop-blur-lg bg-black/30 border-t border-purple-800/40 px-4 py-4 max-sm:py-2">
        <div className="flex justify-between items-center gap-4 max-w-6xl mx-auto">
          <button
            onClick={handlePrevious}
            disabled={index === 0}
            className={`px-6 max-sm:px-3 py-2 rounded-full font-semibold transition-all duration-200 border ${
              index === 0
                ? "bg-black/40 text-gray-500 cursor-not-allowed border-gray-700/40"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            }`}
          >
            ← 
          </button>

          <span className="text-sm font-medium text-purple-300">
            Question {index + 1} of {questionSet.length}
          </span>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={selected === null || answeredQuestions[index] !== undefined}
              className={`px-6 max-sm:px-3 py-2 rounded-full font-semibold transition-all duration-200 border ${
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
              className={`px-6 max-sm:px-3 py-2 rounded-full font-semibold transition-all duration-200 border ${
                index === questionSet.length - 1
                  ? "bg-black/40 text-gray-500 cursor-not-allowed border-gray-700/40"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}