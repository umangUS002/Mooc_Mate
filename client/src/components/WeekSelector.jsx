import React from "react";

export default function WeekSelector({ selectedWeeks, setSelectedWeeks }) {
  const toggleWeek = (week) => {
    setSelectedWeeks(prev =>
      prev.includes(week)
        ? prev.filter(w => w !== week)
        : [...prev, week]
    );
  };

  const handleFullTest = () => {
    setSelectedWeeks([...Array(12)].map((_, i) => i + 1));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Weeks</h2>
      <div className="grid grid-cols-3 gap-2 text-left max-w-xs mx-auto">
        {[...Array(12)].map((_, i) => (
          <label key={i}>
            <input
              type="checkbox"
              checked={selectedWeeks.includes(i + 1)}
              onChange={() => toggleWeek(i + 1)}
            /> Week {i + 1}
          </label>
        ))}
      </div>
      <button
        onClick={handleFullTest}
        className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
      >
        Full Test (All Weeks)
      </button>
    </div>
  );
}
