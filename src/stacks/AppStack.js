import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import * as Font from "expo-font";

import Header from "../components/Header";
import StartGameScreen from "../screens/StartGameScreen";
import GameScreen from "../screens/GameScreen";
import GameOverScreen from "../screens/GameOverScreen";

export default AppStack = () => {
  const [loading, setLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [stage, setStage] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const playAgainHandler = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
  };

  const startGameHandler = () => {
    setStartGame(true);
  };

  const gameOverHandler = () => {
    if (stage < 12 && round < 7) {
      setScore(100);
    } else {
      setScore(50);
    }
    setGameOver(true);
  };

  const goHomeHandler = () => {
    setScore(0);
    setRound(1);
    setStartGame(false);
    setGameOver(false);
  };

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
      });
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    preLoad();

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar hidden={true} />
      <Image
        style={{ width: 115, height: 115 }}
        source={require("../../assets/icon.png")}
      />
    </View>
  ) : (
    <View style={styles.screen}>
      <StatusBar hidden={true} />
      <Header title={startGame ? `STAGE ${stage}` : "Guess a Number"} />
      <View style={styles.body}>
        {startGame ? (
          gameOver ? (
            <GameOverScreen
              onPlayAgain={playAgainHandler}
              onGoHome={goHomeHandler}
              stage={stage}
              setStage={setStage}
              totalScore={totalScore}
              setTotalScore={setTotalScore}
              score={score}
            />
          ) : (
            <GameScreen
              onGameOver={gameOverHandler}
              onGoHome={goHomeHandler}
              stage={stage}
              setRound={setRound}
            />
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
};

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
