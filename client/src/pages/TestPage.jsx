import React, { useState } from "react";
import week1 from "../data/week1.json"
import WeekSelector from "../components/WeekSelector";
import QuizPage from "../components/QuizPage";

function TestPage() {
  const [stage, setStage] = useState("home"); // home | quiz
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [learningMode, setLearningMode] = useState(true);
  const [questions, setQuestions] = useState([]);

  const handleStart = async () => {
    let selectedData = [];

    if (selectedWeeks.length === 0) {
      alert("Select at least one week or choose Full Test!");
      return;
    }

    // Example — import all JSONs manually (for now week1, week2)
    const weekData = { 1: week1};

    selectedWeeks.forEach(week => {
      selectedData = selectedData.concat(weekData[week]);
    });

    // Shuffle questions
    selectedData.sort(() => Math.random() - 0.5);

    setQuestions(selectedData);
    setStage("quiz");
  };

  if (stage === "quiz") {
    return <QuizPage questions={questions} learningMode={learningMode} onRestart={() => setStage("home")} />;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Platform</h1>
      <WeekSelector selectedWeeks={selectedWeeks} setSelectedWeeks={setSelectedWeeks} />

      <div className="mt-6">
        <label className="mr-3">
          <input
            type="radio"
            checked={learningMode}
            onChange={() => setLearningMode(true)}
          /> Learning Mode
        </label>
        <label>
          <input
            type="radio"
            checked={!learningMode}
            onChange={() => setLearningMode(false)}
          /> Test Mode
        </label>
      </div>

      <button
        onClick={handleStart}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default TestPage;
