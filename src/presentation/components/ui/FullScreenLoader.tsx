import React from "react";
import {StyleSheet} from "react-native";
import {Layout, Spinner} from "@ui-kitten/components";

export const FullScreenLoader = () => {
  return (
    <Layout style={styles.container}>
      <Spinner size="medium" />
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
