import React, { useState, createContext } from "react";

const GameContext = createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    stage: 1,
    totalScore: 0,
    gameEnd: false,
  });

  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
