import "react-native-gesture-handler";

import React from "react";
import {useColorScheme} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {NavigationContainer} from "@react-navigation/native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as eva from "@eva-design/eva";

import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {StackNavigator} from "./presentation/navigation/StackNavigator";
import {Notifications} from "./presentation/components/ui/notification";
import {AuthProvider} from "./presentation/providers/AuthProvider";

// Create a client
const queryClient = new QueryClient();

export default function ProductsApp() {
  const colorSchema = useColorScheme();
  const theme = colorSchema === "dark" ? eva.dark : eva.light;
  const backgroundColor =
    colorSchema === "dark"
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorSchema === "dark",
            colors: {
              primary: theme["color-primary-500"],
              background: backgroundColor,
              text: theme["text-color-basic"],
              card: backgroundColor,
              border: "transparent",
              notification: theme["color-primary-500"],
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
          <Notifications position="right" />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
