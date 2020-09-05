import React from "react";
import { StyleSheet, TextInput } from "react-native";

import colors from "../constants/colors";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: colors.primaryColor,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
});

export default Input;
