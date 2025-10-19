import React from "react";
import { ChevronRight } from "lucide-react";

export default function CourseDescription() {
  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl border border-purple-900/30 
                 bg-black/40 backdrop-blur-md p-10 shadow-[0_0_35px_rgba(168,85,247,0.25)] 
                 text-gray-200 mb-10"
    >
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Psychology of Learning
      </h1>
      <p>Prof. Atasi Mohanty</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-6 mt-6">
        <span className="bg-cyan-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          Exam Month - November 2025
        </span>
        <span className="bg-cyan-600 text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow-[0_0_10px_rgba(16,185,129,0.5)]">
          3 credits
        </span>
      </div>

      {/* Description */}
      <p className="leading-relaxed text-gray-300 text-justify">
        The learners will be able to:
        <br />1. Take interest and learn the subject thoroughly and engage
        themselves in different learning activities.
        <br />2. Become self-motivated learners, develop effective study skills,
        and can self-monitor and regulate their academic behavior successfully.
        <br />3. Differentiate among various learning modalities and
        constructively redesign their own learning experiences.
        <br />4. Develop reflective thinking, problem solving, and collaborative
        learning skills to actively participate in team projects.
      </p>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-5 italic">
        Last updated in October 2025.
      </p>
    </div>
  );
}
