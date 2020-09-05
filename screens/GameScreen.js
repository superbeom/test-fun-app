import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DoneButton from "../components/DoneButton";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";
import { YOUR_PICKS, GO_HOME } from "../constants/strings";
import checkStage from "../utils/checkStage";

const size = vw(25);

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum;
};

const renderListItem = (value, numOfRound) => (
  <View style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = ({ onGameOver, onGoHome, stage }) => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentGuess, setCurrentGuess] = useState(null);
  const [pastGuesses, setPastGuesses] = useState([]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [hint, setHint] = useState(null);

  const checkGoHome = () => {
    Alert.alert(
      "Seriously go home?",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Go home", onPress: onGoHome },
      ],
      { cancelable: true }
    );
  };

  const numberInputHandler = (inputText) => {
    /* [0-9]: 0~9 // ^: not // [^0-9]: not 0~9 -> 0~9가 아니면, ""로 대체해라 */
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    setCurrentGuess(chosenNumber);
    console.log("randomNumber: ", randomNumber);
    if (randomNumber === chosenNumber) {
      onGameOver();
    }
    if (isNaN(chosenNumber)) {
      Alert.alert("Invalid number!", "", [
        { text: "Okay", style: "destructive", onPress: () => null },
      ]);
      return;
    }
    setSelectedNumber(chosenNumber);
  };

  const nextGuessHandler = (direction) => {
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      /* Low boundary is included in a future random number
        To fix this, add 1 */
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  useEffect(() => {
    const { min, max } = checkStage(stage);
    setRandomNumber(generateRandomNumber(min, max));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={"height"}
        enabled={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Input
            style={styles.input}
            // maxLength={2}
            autoCapitalize={"none"}
            autoCorrect={false}
            keyboardType={"number-pad"}
            onChangeText={numberInputHandler}
            value={enteredValue}
            placeholder={"Input here!"}
            onSubmitEditing={confirmInputHandler}
          />
          <DoneButton style={styles.button} onPress={confirmInputHandler}>
            <FontAwesome name="send" size={vw(6)} color={colors.whiteColor} />
          </DoneButton>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <View style={styles.hintContainer}>
            <View style={styles.hintBall}>
              {randomNumber > selectedNumber ? (
                <Entypo
                  name="arrow-bold-up"
                  size={vh(6)}
                  color={colors.whiteColor}
                />
              ) : (
                <Entypo
                  name="arrow-bold-down"
                  size={vh(6)}
                  color={colors.whiteColor}
                />
              )}
            </View>
            <View />
          </View>
          <Card style={styles.listContainer}>
            <View style={styles.listTitle}>
              <BodyText>{YOUR_PICKS}</BodyText>
            </View>
            <FlatList
              data={pastGuesses}
              renderItem={({ item, index }) =>
                renderListItem(item, pastGuesses.length - index)
              }
              keyExtractor={(item) => item.toString()}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </Card>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <MainButton onPress={checkGoHome}>{GO_HOME}</MainButton>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: vw(9),
    height: "70%",
  },
  button: {
    width: "15%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 5,
    width: "100%",
    flexDirection: "row",
    marginTop: vh(3),
  },
  hintContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  hintBall: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.primaryColor,
    shadowColor: colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
  },
  listTitle: {
    marginBottom: 10,
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.lightGrayColor,
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.whiteColor,
    justifyContent: "space-around",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default GameScreen;
