import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver, onGoHome }) => {
  const iniitalGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(iniitalGuess);
  const [pastGuesses, setPastGuesses] = useState([iniitalGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

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

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert(
        "Don't lie!",
        "You know that this is wrong...",
        [{ text: "Sorry!", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      /* Low boundary is included in a future random number
        To fix this, add 1 */
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <Input
          style={styles.input}
          maxLength={2}
          autoCapitalize={"none"}
          autoCorrect={false}
          keyboardType={"number-pad"}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <NumberContainer>{currentGuess}</NumberContainer>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton
            onPress={nextGuessHandler.bind(this, "lower")}
            color={colors.primaryColor}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton
            onPress={nextGuessHandler.bind(this, "greater")}
            color={colors.primaryColor}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        {/* ScrollView를 View로 감싸서 flex: 1 설정해 줘야,
          스크롤이 제대로 나타남 */}
        <Card style={styles.listContainer}>
          <View style={styles.listTitle}>
            <BodyText>Your picks</BodyText>
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
        <MainButton onPress={onGameOver.bind(this, 1)}>DONE</MainButton>
        <MainButton onPress={checkGoHome}>GO HOME</MainButton>
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
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
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
});

export default GameScreen;
