import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmojiGame from "./components/EmojiGame";
import QuestionManager from "./components/QuestionManager";

export default function App() {
  return (
      <Router>
        <nav>
          <Link to="/">Emoji Oyunu</Link> | <Link to="/manage">Soruları Yönet</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EmojiGame />} />
          <Route path="/manage" element={<QuestionManager />} />
        </Routes>
      </Router>
  );
}
