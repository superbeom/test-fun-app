import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  BackHandler,
  Alert,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { GameContext } from "../context/GameContext";

import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DoneButton from "../components/DoneButton";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";
import { YOUR_PICKS, GO_HOME } from "../constants/strings";
import checkStage from "../utils/checkStage";

const SIZE = vw(25);

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum;
};

const renderListItem = (value, numOfRound) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

const GameScreen = ({ onGameOver, onGoHome, setRound }) => {
  const [{ stage, totalScore }, setGameInfo] = useContext(GameContext);
  const [start, setStart] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [pastGuesses, setPastGuesses] = useState([]);

  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();

  const animation = useRef(new Animated.Value(0)).current;

  const zeroToOne = () => {
    return Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: false,
    });
  };

  const oneToZero = () => {
    return Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      delay: 300,
      useNativeDriver: false,
    });
  };

  const executeAnimation = () => {
    Animated.loop(Animated.sequence([zeroToOne(), oneToZero()])).start();
  };

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

    return true;
  };

  const numberInputHandler = (inputText) => {
    /* [0-9]: 0~9 // ^: not // [^0-9]: not 0~9 -> 0~9가 아니면, ""로 대체해라 */
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (randomNumber === chosenNumber) {
      onGameOver();
    }

    if (isNaN(chosenNumber)) {
      Alert.alert("Invalid number!", "", [
        { text: "Okay", style: "destructive", onPress: () => null },
      ]);
      return;
    }

    setRound((curRound) => curRound + 1);
    executeAnimation();
    nextGuessHandler(chosenNumber);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    setStart(true);
  };

  const nextGuessHandler = (chosenNumber) => {
    setPastGuesses((curPastGuesses) => [chosenNumber, ...curPastGuesses]);
  };

  useEffect(() => {
    const { min, max } = checkStage(stage);
    setRandomNumber(generateRandomNumber(min, max));

    Alert.alert(
      "Guess my number :)",
      `${min} ~ ${max}`,
      [{ text: "Got it", onPress: null }],
      {
        cancelable: true,
      }
    );

    BackHandler.addEventListener("hardwareBackPress", checkGoHome);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", checkGoHome);
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
            maxLength={
              stage <= 11
                ? 3
                : stage > 11 && stage <= 39
                ? 4
                : stage > 39 && stage <= 82
                ? 5
                : stage > 82 && stage <= 105
                ? 6
                : 7
            }
            autoCapitalize={"none"}
            autoCorrect={false}
            keyboardType={"number-pad"}
            onChangeText={numberInputHandler}
            value={enteredValue}
            placeholder={"Input here!"}
            onSubmitEditing={confirmInputHandler}
            autoFocus={true}
            blurOnSubmit={false}
          />
          <DoneButton style={styles.button} onPress={confirmInputHandler}>
            <FontAwesome name="send" size={vw(6)} color={colors.whiteColor} />
          </DoneButton>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <View style={styles.hintContainer}>
            <View style={styles.hintBall}>
              <Animated.View style={{ opacity: animation }}>
                {start ? (
                  randomNumber > selectedNumber ? (
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
                  )
                ) : null}
              </Animated.View>
            </View>
            <View />
          </View>
          <Card style={styles.listContainer}>
            <View style={styles.listTitle}>
              <BodyText>{YOUR_PICKS}</BodyText>
            </View>
            {pastGuesses ? (
              <FlatList
                data={pastGuesses}
                renderItem={({ item, index }) =>
                  renderListItem(item, pastGuesses.length - index)
                }
                keyExtractor={() => (Math.random() + Math.random()).toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
              />
            ) : null}
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
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
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
    justifyContent: "space-between",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default GameScreen;
