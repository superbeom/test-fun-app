import React from "react";
import { StyleSheet, View } from "react-native";
import { vh, vmax } from "react-native-expo-viewport-units";

import TitleText from "./TitleText";
import colors from "../constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    paddingTop: vh(3),
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.whiteColor,
    fontSize: vmax(3),
  },
});

export default Header;
