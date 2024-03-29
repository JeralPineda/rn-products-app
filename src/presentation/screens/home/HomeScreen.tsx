import React from "react";
import {Button, Icon, Layout, Text} from "@ui-kitten/components";
import {useAuthStore} from "../../store";

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  return (
    <Layout style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>HomeScree</Text>

      <Button onPress={logout} accessoryLeft={<Icon name="lock-outline" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
