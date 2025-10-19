import React from "react";
import atasiImg from "../assets/download.jpeg";

export default function InstructorInfo() {
  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl border border-purple-900/30 
                 bg-black/40 backdrop-blur-md p-6 shadow-[0_0_35px_rgba(168,85,247,0.25)] 
                 text-gray-200 mb-10"
    >
      {/* Books and References */}
      <h2 className="text-3xl font-bold text-white mb-4">Books and References</h2>
      <ul className="list-decimal list-inside space-y-2 text-gray-300 leading-relaxed">
        <li>
          Woolfolk, A. <i>Educational Psychology.</i> Allyn &amp; Bacon, Bosson, 1998.
        </li>
        <li>
          Good T., <i>Educational Psychology,</i> Longman, New York, 1990.
        </li>
        <li>
          Slavin, R., <i>Educational Psychology. Theory into Practice,</i> Prentice Hall, Englewood Cliffs, N.J., 1990.
        </li>
      </ul>

      {/* Instructor Bio */}
      <h2 className="text-3xl font-bold text-white mt-10 mb-4">Instructor Bio</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Profile Image */}
        <img
          src={atasiImg} // Replace with actual image path
          alt="Prof. Atasi Mohanty"
          className="w-32 h-32 rounded-full border-2 border-purple-500 shadow-lg object-cover"
        />

        {/* Bio Text */}
        <div>
          <h3 className="text-xl font-semibold text-white">Prof. Atasi Mohanty</h3>
          <p className="text-sm text-gray-400 mb-2">IIT Kharagpur</p>
          <p className="text-gray-300 leading-relaxed text-justify">
            Prof. Atasi Mohanty has done her Ph.D. in Educational Psychology from
            the Centre of Advanced Study in Psychology, Utkal University, Bhubaneswar, India.
            She has also earned her M.Phil. degrees both in Education and Psychology.
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-6 italic">
        Last updated in October 2025.
      </p>
    </div>
  );
}
