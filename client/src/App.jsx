import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResultPage from "./components/ResultPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import {Analytics} from '@vercel/analytics/react'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testPage" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
      <Analytics/>
    </BrowserRouter>
  );
}
