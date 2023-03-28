import { useState, useEffect } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const fetchTeams = async () => {
  const teamsRef = query(collection(db, "buzzers"));
  const snapshot = await getDocs(teamsRef);

  const teamsData = snapshot.docs.map((doc) => doc.data());

  return teamsData;
};

export const useTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams().then((teamsData) => {
      setTeams(teamsData);
    });
  }, []);

  return teams;
};

// export default [
//   { name: "Bruins", score: 0 },
//   { name: "Celtics", score: 0 },
//   { name: "Patriots", score: 0 },
// ];

export default useTeams;
