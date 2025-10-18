import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { score, total, incorrectQuestions } = state || {
    score: 0,
    total: 0,
    incorrectQuestions: [],
  };

  const percentage = ((score / total) * 100).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Results</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <p className="text-xl font-semibold mb-2">
          Score: {score} / {total}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 my-3">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-lg mb-4">Accuracy: {percentage}%</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/quiz", { state: { retry: incorrectQuestions } })}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            🔁 Retry Incorrect Questions Only
          </button>
          <button
            onClick={() => navigate("/review", { state })}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
          >
            📖 Review All Answers
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
