import "react-native-gesture-handler";

import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {StackNavigator} from "./presentation/navigation/StackNavigator";
import {useColorScheme} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

export default function ProductsApp() {
  const colorSchema = useColorScheme();
  const theme = colorSchema === "dark" ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
