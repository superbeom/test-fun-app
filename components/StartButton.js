import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { vw } from "react-native-expo-viewport-units";

import colors from "../constants/colors";

const StartButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(40) / 2,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: colors.whiteColor,
    fontSize: vw(6),
    fontFamily: "open-sans-bold",
  },
});

export default StartButton;
