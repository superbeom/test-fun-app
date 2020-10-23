import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";

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
  const checkResetGame = () => {
    Alert.alert(
      "Seriously reset game?",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset game", onPress: () => null },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.scoreContainer}>
          <Card style={styles.card}>
            <View>
              <Text style={styles.cardText}>{YOUR_SCORE}</Text>
            </View>
            <View>
              <Text style={styles.cardText}>{CURRENT_STAGE}</Text>
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
