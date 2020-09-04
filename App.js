import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as Font from "expo-font";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);

  const startGameHandler = () => {
    setStartGame(true);
  };

  const gameOverHandler = () => {
    setGameOver(true);
  };

  const goHomeHandler = () => {
    setStartGame(false);
    setGameOver(false);
  };

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      });
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 115, height: 115 }}
        source={require("./assets/icon.png")}
      />
    </View>
  ) : (
    <View style={styles.screen}>
      <Header title={startGame ? `STAGE ${stage}` : "Guess a Number"} />
      <View style={styles.body}>
        {startGame ? (
          gameOver ? (
            <GameOverScreen onGoHome={goHomeHandler} />
          ) : (
            <GameScreen onGameOver={gameOverHandler} onGoHome={goHomeHandler} />
          )
        ) : (
          <StartGameScreen onStartGame={startGameHandler} />
        )}
      </View>
      <View style={styles.ads}>
        <Text>This is Ads Area</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 11,
  },
  ads: {
    flex: 1.2,
    backgroundColor: "lightpink",
    justifyContent: "center",
    alignItems: "center",
  },
});
