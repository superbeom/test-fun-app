import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { vw, vh } from "react-native-expo-viewport-units";

import { GameContext } from "../context/GameContext";

import Card from "../components/Card";
import StartButton from "../components/StartButton";
import MainButton from "../components/MainButton";
import {
  YOUR_SCORE,
  CURRENT_STAGE,
  GAME_START,
  RESET_GAME,
} from "../constants/strings";

const StartGameScreen = ({ onStartGame }) => {
  const [{ stage, totalScore }, setGameInfo] = useContext(GameContext);

  const resetGame = async () => {
    /* Local reset */
    setGameInfo({
      stage: 1,
      totalScore: 0,
    });
    /* AsyncStorage reset */
    await AsyncStorage.clear();
  };

  const checkResetGame = () => {
    Alert.alert(
      "Seriously reset game?",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset game", onPress: resetGame },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.scoreContainer}>
          <Card style={styles.card}>
            <View style={styles.cardBox}>
              <Text style={styles.cardText}>{CURRENT_STAGE}</Text>
              <Text style={styles.cardText}>{stage}</Text>
            </View>
            <View style={styles.cardBox}>
              <Text style={styles.cardText}>{YOUR_SCORE}</Text>
              <Text style={styles.cardText}>{totalScore}</Text>
            </View>
          </Card>
        </View>
        <View style={styles.gameStartContainer}>
          <StartButton onPress={onStartGame}>{GAME_START}</StartButton>
        </View>
        <View style={styles.resetGameContainer}>
          <MainButton onPress={checkResetGame}>{RESET_GAME}</MainButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  scoreContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: vw(80),
    maxWidth: "80%",
    height: vh(13),
    justifyContent: "space-around",
  },
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: vw(4.5),
    fontWeight: "700",
  },
  gameStartContainer: {
    flex: 1,
    justifyContent: "center",
  },
  resetGameContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default StartGameScreen;
