import React from "react";
import {StyleSheet} from "react-native";
import {Layout, Spinner} from "@ui-kitten/components";

export const LoadingScreen = () => {
  return (
    <Layout style={styles.container}>
      <Spinner status="primary" size="medium" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
