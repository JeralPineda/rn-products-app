import React from "react";
import {Button, Icon, Layout, Text} from "@ui-kitten/components";
import {useAuthStore} from "../../store";
import {getProductsByPage} from "../../../actions/products/get-products-by-page";

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  // getProductsByPage(0);

  return (
    <Layout style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>HomeScree</Text>

      <Button onPress={logout} accessoryLeft={<Icon name="lock-outline" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
