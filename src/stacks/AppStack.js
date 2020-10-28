import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";
import { AdMobBanner } from "expo-ads-admob";

import { GameContext } from "../context/GameContext";
import getScore from "../utils/getScore";

import Header from "../components/Header";
import StartGameScreen from "../screens/StartGameScreen";
import GameScreen from "../screens/GameScreen";
import GameOverScreen from "../screens/GameOverScreen";

export default AppStack = () => {
  const [{ stage }, setGameInfo] = useContext(GameContext);
  const [loading, setLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const playAgainHandler = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
  };

  const startGameHandler = () => {
    setStartGame(true);
    playAgainHandler();
  };

  const gameOverHandler = () => {
    const resultScore = getScore(stage, round);

    setScore(resultScore);
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

      const storageStage = parseInt(await AsyncStorage.getItem("STAGE"));
      const storageScore = parseInt(await AsyncStorage.getItem("TOTAL_SCORE"));
      const storageGameEnd = await AsyncStorage.getItem("GAME_END");

      if (storageStage && storageScore) {
        if (storageGameEnd === "true") {
          setGameInfo({
            stage: storageStage,
            totalScore: storageScore,
            gameEnd: true,
          });
        } else {
          setGameInfo({
            stage: storageStage,
            totalScore: storageScore,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);

    return true;
  };

  useEffect(() => {
    preLoad();

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
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
      <Header
        title={
          startGame
            ? stage === 110
              ? gameOver
                ? "Congratulation!"
                : `STAGE ${stage}`
              : `STAGE ${stage}`
            : "Guess My Number"
        }
      />
      <View style={styles.body}>
        {startGame ? (
          gameOver ? (
            <GameOverScreen
              onPlayAgain={playAgainHandler}
              onGoHome={goHomeHandler}
              onStartGame={startGameHandler}
              score={score}
            />
          ) : (
            <GameScreen
              onGameOver={gameOverHandler}
              onGoHome={goHomeHandler}
              setRound={setRound}
            />
          )
        ) : (
          <StartGameScreen onStartGame={startGameHandler} />
        )}
      </View>
      <View style={styles.ads}>
        {Platform.OS === "ios" ? (
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-8452350078553076/5289940846" // This is my ID
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        ) : (
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-8452350078553076/1201510269" // This is my ID
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        )}
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
