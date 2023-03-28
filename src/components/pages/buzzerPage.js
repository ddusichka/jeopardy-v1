import { React, useState, useEffect } from "react";
import Buzzer from "../Buzzer";
import useTeams from "../../teamList";

const BuzzerPage = () => {
  const [team, setTeam] = useState();
  const allTeams = useTeams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(allTeams);
  }, [allTeams]);

  if (!team) {
    return (
      <div className="chooseTeam">
        <h2 className="chooseTeam">Choose your team:</h2>
        {teams.map((team, teamIndex) => {
          return (
            <button
              key={teamIndex}
              className="teamButton"
              onClick={() => setTeam(team)}
            >
              {team.name}
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="buzzers">
        <Buzzer teamName={team.name} />
        <br></br>
        <button className="closeButton" onClick={() => setTeam(null)}>
          Return
        </button>
      </div>
    );
  }
};

export default BuzzerPage;
