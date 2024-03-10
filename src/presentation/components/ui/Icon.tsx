import React from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import {Icon as MyIcon, useTheme} from "@ui-kitten/components";

export interface IconProps {
  name: string;
  color?: string;
  white?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Icon({name, color, white = false, style}: IconProps) {
  const theme = useTheme();

  const fillColor = white
    ? theme["color-text-basic"]
    : !color
    ? theme["color-basic-500"]
    : theme[color] ?? theme["color-basic-500"];

  return (
    <MyIcon
      //
      name={name}
      fill={fillColor}
      style={[styles.icon, style]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
});
