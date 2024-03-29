import {Layout} from "@ui-kitten/components";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
  useColorScheme,
} from "react-native";
import {normalize} from "../../../utils/metrics";

interface LogoProps {
  styleContainer?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export const Logo = ({styleContainer, imageStyle}: LogoProps) => {
  const colorSchema = useColorScheme();

  const urlImage =
    colorSchema === "dark"
      ? require("../../../assets/logo-dark.png")
      : require("../../../assets/logo-light.png");

  return (
    <Layout style={[styles.constainer, styleContainer]}>
      <Image source={urlImage} alt="Logo" style={[styles.logo, imageStyle]} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: normalize(300),
    height: normalize(80),
  },
});
