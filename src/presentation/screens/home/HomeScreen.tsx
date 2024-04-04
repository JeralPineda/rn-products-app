import React from "react";
import {Text} from "@ui-kitten/components";
import {getProductsByPage} from "../../../actions/products/get-products-by-page";
import {useQuery} from "@tanstack/react-query";
import {MainLayout} from "../../layouts/MainLayout";

export const HomeScreen = () => {
  const {isLoading, data: products = []} = useQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60, // 1hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title="TesloShop - Productos"
      subTitle="Aplicación administrativa">
      <Text>HomeScree</Text>
    </MainLayout>
  );
};
