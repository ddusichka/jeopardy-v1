import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

import "../GameBoard.css";

export default function BuzzerPanel({ questionTime }) {
  const [buzzers, setBuzzers] = useState();

  useEffect(() => {
    const q = query(
      collection(db, "buzzers"),
      where("timestamp", ">", questionTime),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let buzzers = [];
      querySnapshot.forEach((buzz) => {
        buzzers.push({ ...buzz.data() });
      });
      setBuzzers(buzzers);
    });

    return () => unsubscribe();
  }, [questionTime]);

  function currentBuzzes() {
    if (buzzers) {
      return (
        <div className="buzzes">
          {buzzers.map((buzz, buzzIndex) => (
            <p key={buzzIndex}>
              {buzzIndex + 1}
              {". " + buzz.name}
              {/* {buzz.timestamp
              ? buzz.timestamp.toDate().toLocaleTimeString("en-US")
              : null} */}
            </p>
          ))}
        </div>
      );
    }
  }

  return <div>{currentBuzzes()}</div>;
}
