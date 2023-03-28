import { React, useState } from "react";
import teamList from "../teamList";

import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import "../GameBoard.css";

export default function Buzzer({ teamName }) {
  const [team, setTeam] = useState(teamName);

  async function handleBuzzerClick() {
    const docRef = doc(db, "buzzers", team);
    const docSnap = await getDoc(docRef);

    /* Get the time the last question was shown. Use this to check if there are any buzzes from before this. */
    const questionRef = doc(db, "question", "question");
    const questionSnap = await getDoc(questionRef);

    /* Only write/overwrite a buzz if there is no data yet, or if the last buzz came from before the current question. */
    if (
      !docSnap.data() ||
      docSnap.data().timestamp < questionSnap.data().timestamp
    ) {
      await setDoc(doc(db, "buzzers", team), {
        buzzed: true,
        timestamp: serverTimestamp(),
        name: team,
      });
    }
  }

  return (
    <div className="buzzers">
      <h2>{team ? `Welcome,   ${team}!` : "Choose your team!"}</h2>
      {!team &&
        teamList.map((team) => {
          return (
            <button key={team.name} onClick={() => setTeam(team.name)}>
              {team.name}
            </button>
          );
        })}
      {team && (
        <button className="greenButton" onClick={handleBuzzerClick}>
          Buzz in!
        </button>
      )}
    </div>
  );
}
