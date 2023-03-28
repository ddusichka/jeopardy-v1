import React, { useState, useEffect } from "react";
import useTeams from "../teamList";
import "../Scores.css";

export default function Scores({ currentPoints }) {
  const allTeams = useTeams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(allTeams);
  }, [allTeams]);

  function addPoints(updatedTeamIndex, points) {
    const updatedTeams = teams.map((team, teamIndex) => {
      return teamIndex === updatedTeamIndex
        ? {
            name: team.name,
            score: Math.max(0, parseInt(team.score) + points),
          }
        : team;
    });
    setTeams(updatedTeams);
  }

  return (
    <div className="score-board">
      {teams.map((team, teamIndex) => (
        <div key={team.name} className="score">
          <h3>{team.name}</h3>
          <input
            className="scoreInput"
            value={(team.score ??= 0)}
            onChange={(e) => {
              const updatedTeams = teams.map((team, index) => {
                return index === teamIndex
                  ? { name: team.name, score: e.target.value }
                  : team;
              });
              setTeams(updatedTeams);
            }}
          ></input>

          <div>
            <button
              className="points"
              onClick={() => addPoints(teamIndex, -1 * currentPoints)}
            >
              -
            </button>
            <button
              className="points"
              onClick={() => addPoints(teamIndex, currentPoints)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
