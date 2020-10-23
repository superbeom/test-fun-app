import React from "react";
import { StyleSheet, Text } from "react-native";
import { vw } from "react-native-expo-viewport-units";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: vw(4.5),
  },
});

export default TitleText;
