/* eslint-disable react/self-closing-comp */
import React from "react";
import {Button} from "@ui-kitten/components";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import Icon from "./Icon";

interface FabProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({style, iconName, onPress}: FabProps) => {
  return (
    <Button
      //
      style={[styles.button, style]}
      accessoryLeft={<Icon name={iconName} color="white" />}
      onPress={onPress}></Button>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 13,
  },
});
