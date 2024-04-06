import React from "react";
import {getProductsByPage} from "../../../actions/products/get-products-by-page";
import {useQuery} from "@tanstack/react-query";
import {MainLayout} from "../../layouts/MainLayout";
import {FullScreenLoader} from "../../components/ui/FullScreenLoader";
import {ProductList} from "../../components/products/ProductList";

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
      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </MainLayout>
  );
};
