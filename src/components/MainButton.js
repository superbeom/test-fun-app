import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";

import colors from "../constants/colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <View
        style={[
          styles.button,
          { backgroundColor: props.color || colors.whiteColor },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: props.textColor || colors.blackColor },
          ]}
        >
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: vh(1.4),
    paddingHorizontal: vw(8),
    borderRadius: 25,
    shadowColor: colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: vw(4),
    fontFamily: "open-sans",
  },
});

export default MainButton;
