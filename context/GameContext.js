import React, { useState, createContext } from "react";

const GameContext = createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    stage: 1,
    totalScore: 0,
  });

  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
