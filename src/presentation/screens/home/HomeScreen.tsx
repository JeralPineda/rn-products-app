import React from "react";
import {Button, Icon, Layout, Text} from "@ui-kitten/components";
import {useAuthStore} from "../../store";
import {getProductsByPage} from "../../../actions/products/get-products-by-page";
import {useQuery} from "@tanstack/react-query";

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  const {isLoading, data: products = []} = useQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60, // 1hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <Layout style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>HomeScree</Text>

      <Text>{JSON.stringify(products, null, 2)}</Text>

      {/* <Button onPress={logout} accessoryLeft={<Icon name="lock-outline" />}>
        Cerrar sesión
      </Button> */}
    </Layout>
  );
};
