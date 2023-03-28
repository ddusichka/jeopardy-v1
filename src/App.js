import "./App.css";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Game from "./components/pages/game";
import BuzzerPage from "./components/pages/buzzerPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/buzzer" element={<BuzzerPage teamName="team1" />} />
      </Routes>
    </Router>
  );
}
