import React from "react";
import { CheckCircle } from "lucide-react";

export default function WeekSelector({ selectedWeeks, setSelectedWeeks }) {
  const toggleWeek = (week) => {
    setSelectedWeeks((prev) =>
      prev.includes(week)
        ? prev.filter((w) => w !== week)
        : [...prev, week]
    );
  };

  const handleFullTest = () => {
    setSelectedWeeks([...Array(12)].map((_, i) => i + 1));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-300 mb-6 tracking-wide">
        Select Weeks
      </h2>

      <div className="grid grid-cols-3 gap-4 max-sm:gap-2 lg:grid-cols-3">
        {[...Array(12)].map((_, i) => {
          const week = i + 1;
          const isSelected = selectedWeeks.includes(week);

          return (
            <div
              key={week}
              onClick={() => toggleWeek(week)}
              className={`cursor-pointer flex gap-2 max-sm:gap-1 items-center md:flex-row flex-col p-5 max-sm:p-3 rounded-2xl border transition-all duration-300 backdrop-blur-sm
                ${isSelected
                  ? "border-purple-500 bg-purple-900/30 shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-[1.03]"
                  : "border-gray-800 bg-black/40 hover:border-purple-600 hover:bg-purple-900/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                }`}
            >
              <span
                className={`font-semibold text-md ${isSelected ? "text-purple-300" : "text-gray-200"
                  }`}
              >
                Week {week}
              </span>

              <div
                className={`flex items-center gap-2 px-3 max-sm:px-1 py-1 rounded-full text-sm font-medium transition-all ${isSelected
                    ? "bg-purple-600/80 text-white"
                    : "bg-gray-800 text-gray-300"
                  }`}
              >
                <CheckCircle
                  size={16}
                  className={isSelected ? "text-white" : "text-purple-400"}
                />
                10 Qs
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleFullTest}
        className="mt-8 bg-cyan-600 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] 
                   hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
      >
        Full Test (All Weeks)
      </button>
    </div>
  );
}
