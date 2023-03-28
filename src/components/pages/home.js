import { React, useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "../../GameBoard.css";

const Home = () => {
  const [teams, setTeams] = useState();
  const [currentTeam, setCurrentTeam] = useState();

  useEffect(() => {
    const q = query(collection(db, "buzzers"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let teams = [];
      querySnapshot.forEach((team) => {
        teams.push({ ...team.data() });
      });
      setTeams(teams);
    });

    return () => unsubscribe();
  }, []);

  async function removeTeam(teamName) {
    await deleteDoc(doc(db, "buzzers", teamName));
  }

  function currentTeams() {
    if (teams) {
      return (
        <div className="teams">
          <h2>Current teams:</h2>
          {teams.map((team, teamIndex) => (
            <p key={teamIndex} onClick={() => removeTeam(team.name)}>
              {team.name}
            </p>
          ))}
        </div>
      );
    }
  }

  async function addTeam() {
    await setDoc(doc(db, "buzzers", currentTeam), {
      timestamp: serverTimestamp(),
      name: currentTeam,
      score: 0,
    });

    document.getElementById("teamInput").value = "";
  }

  return (
    <div className="homePage">
      <h2> Jeopardy! </h2>
      <Link to="/game">
        <button className="greenButton">View game board</button>
      </Link>
      <Link to="/buzzer">
        <button className="closeButton">Access buzzer</button>
      </Link>
      <div className="teamSection">
        <input
          id="teamInput"
          className="teamInput"
          onChange={(e) => setCurrentTeam(e.target.value)}
        ></input>
        <button className="addTeamButton" onClick={addTeam}>
          Add team
        </button>
        {currentTeams()}
      </div>
    </div>
  );
};

export default Home;
