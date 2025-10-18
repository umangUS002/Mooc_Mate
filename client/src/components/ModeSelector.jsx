import React from "react";
import { useNavigate } from "react-router-dom";

export default function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Select Mode</h1>
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/quiz", { state: { mode: "test" } })}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          🧭 Test Mode
        </button>
        <button
          onClick={() => navigate("/quiz", { state: { mode: "learn" } })}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          📘 Learning Mode
        </button>
      </div>
    </div>
  );
}
