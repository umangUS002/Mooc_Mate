import React, { useState } from "react";
import week1 from "../data/week1.json";
import week2 from "../data/week2.json";
import week3 from "../data/week3.json";
import week4 from "../data/week4.json";
import week5 from "../data/week5.json";
import week6 from "../data/week6.json";
import week7 from "../data/week7.json";
import week8 from "../data/week8.json";
import week9 from "../data/week9.json";
import week10 from "../data/week10.json";
import week11 from "../data/week11.json";
import week12 from "../data/week12.json";
import WeekSelector from "../components/WeekSelector";
import QuizPage from "../components/QuizPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CourseDescription from "../components/CourseDesc";
import { BookOpenCheck, ClipboardList } from "lucide-react";
import InstructorInfo from "../components/Info";

function TestPage() {
  const [stage, setStage] = useState("home");
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [learningMode, setLearningMode] = useState(true);
  const [questions, setQuestions] = useState([]);

  const handleStart = async () => {
    if (selectedWeeks.length === 0) {
      alert("Select at least one week or choose Full Test!");
      return;
    }

    const weekData = {
      1: week1,
      2: week2,
      3: week3,
      4: week4,
      5: week5,
      6: week6,
      7: week7,
      8: week8,
      9: week9,
      10: week10,
      11: week11,
      12: week12,
    };

    let selectedData = [];
    selectedWeeks.forEach((week) => {
      selectedData = selectedData.concat(weekData[week]);
    });

    selectedData.sort(() => Math.random() - 0.5);
    setQuestions(selectedData);
    setStage("quiz");
  };

  if (stage === "quiz") {
    return (
      <QuizPage
        questions={questions}
        learningMode={learningMode}
        onRestart={() => setStage("home")}
      />
    );
  }

  return (
    <div style={{
            background: "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)"
        }}>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white p-4 md:p-8 mt-10 md:mt-15 mb-15"
      >
        <div className="backdrop-blur-lg bg-black/30 p-3 md:p-10 max-sm:pb-6 rounded-2xl border border-purple-800/40 shadow-[0_0_40px_rgba(138,43,226,0.25)] max-w-5xl w-full text-center">
          <CourseDescription/>

          <div className="mb-8">
            <WeekSelector
              selectedWeeks={selectedWeeks}
              setSelectedWeeks={setSelectedWeeks}
            />
          </div>

          <div className="flex justify-center items-center gap-8 mb-8">
      {/* Learning Mode */}
      <label
        onClick={() => setLearningMode(true)}
        className={`flex items-center gap-2 px-5 max-sm:px-3 py-2 rounded-full cursor-pointer transition-all duration-300 border
          ${learningMode
            ? "bg-purple-600/30 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            : "bg-black/30 border-gray-700 hover:border-purple-400/60"
          }`}
      >
        <BookOpenCheck
          className={`w-5 h-5 transition-all duration-300 ${
            learningMode ? "text-purple-400" : "text-gray-400"
          }`}
        />
        <span
          className={`font-medium max-sm:text-xs transition-colors ${
            learningMode ? "text-white" : "text-gray-400"
          }`}
        >
          Learning Mode
        </span>
      </label>

      {/* Test Mode */}
      <label
        onClick={() => setLearningMode(false)}
        className={`flex items-center gap-2 px-5 max-sm:px-3 py-2 rounded-full cursor-pointer transition-all duration-300 border
          ${!learningMode
            ? "bg-purple-600/30 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            : "bg-black/30 border-gray-700 hover:border-purple-400/60"
          }`}
      >
        <ClipboardList
          className={`w-5 h-5 transition-all duration-300 ${
            !learningMode ? "text-purple-400" : "text-gray-400"
          }`}
        />
        <span
          className={`font-medium max-sm:text-xs transition-colors ${
            !learningMode ? "text-white" : "text-gray-400"
          }`}
        >
          Test Mode
        </span>
      </label>
    </div>

          <button
            onClick={handleStart}
            className="px-8 py-3 mt-4 rounded-xl font-semibold text-2xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
          >
            Start Quiz
          </button>
        </div>
      </div>
      <div className="px-4">
        <InstructorInfo/>
      </div>
      <Footer />
    </div>
  );
}

export default TestPage;
