import React from "react";
import GameBoard from "../GameBoard";
import questions from "../../questions";

const Game = () => {
  return (
    <div>
      <GameBoard categories={questions} />
    </div>
  );
};

export default Game;
