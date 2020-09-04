import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accentColor,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: colors.accentColor,
    fontSize: 22,
  },
});

export default NumberContainer;
