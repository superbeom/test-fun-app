import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { vh } from "react-native-expo-viewport-units";

import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import StageButton from "../components/StageButton";
import colors from "../constants/colors";
import {
  STAGE_SCORE,
  PLAY_AGAIN,
  NEXT_STAGE,
  GO_HOME,
} from "../constants/strings";

const GameOverScreen = ({ onPlayAgain, onGoHome }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.score}>
        <Card style={styles.card}>
          <TitleText>{STAGE_SCORE}</TitleText>
        </Card>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/success.png")}
          style={styles.image}
          resizeMode={"cover"}
        />
      </View>
      <View style={styles.buttonContainer}>
        <StageButton onPress={onPlayAgain}>{PLAY_AGAIN}</StageButton>
        <StageButton onPress={() => null}>{NEXT_STAGE}</StageButton>
      </View>
      <View style={styles.goHomeContainer}>
        <MainButton onPress={onGoHome}>{GO_HOME}</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    width: "80%",
    marginVertical: vh(5),
  },
  card: {
    width: "100%",
  },
  imageContainer: {
    width: vh(30),
    height: vh(30),
    borderRadius: vh(30) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: vh(5),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: vh(2),
    justifyContent: "space-around",
    alignItems: "center",
  },
  goHomeContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default GameOverScreen;
