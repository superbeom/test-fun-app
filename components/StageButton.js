import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { vw } from "react-native-expo-viewport-units";

import colors from "../constants/colors";

const size = vw(17);

const StageButton = (props) => {
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
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: colors.whiteColor,
    fontSize: vw(4),
    fontFamily: "open-sans",
    textAlign: "center",
  },
});

export default StageButton;
