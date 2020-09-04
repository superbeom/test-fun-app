import React, { useState } from "react";
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

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

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

  const numberInputHandler = (inputText) => {
    /* [0-9]: 0~9 // ^: not // [^0-9]: not 0~9 -> 0~9가 아니면, ""로 대체해라 */
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number\nbetween 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.scoreContainer}>
          <Card style={styles.card}>
            <View>
              <Text style={styles.cardText}>YOUR SCORE: </Text>
            </View>
            <View>
              <Text style={styles.cardText}>CURRENT STAGE: </Text>
            </View>
          </Card>
        </View>
        <View style={styles.gameStartContainer}>
          <StartButton onPress={onStartGame}>GAME{"\n"}START</StartButton>
        </View>
        <View style={styles.resetGameContainer}>
          <MainButton onPress={checkResetGame}>RESET GAME</MainButton>
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
