import React from "react";

import { GameProvider } from "./src/context/GameContext";
import AppStack from "./src/stacks/AppStack";

export default App = () => {
  return (
    <GameProvider>
      <AppStack />
    </GameProvider>
  );
};
