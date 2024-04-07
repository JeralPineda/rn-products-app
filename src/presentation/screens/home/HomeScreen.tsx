import React from "react";
import {getProductsByPage} from "../../../actions/products/get-products-by-page";
import {useInfiniteQuery} from "@tanstack/react-query";
import {MainLayout} from "../../layouts/MainLayout";
import {FullScreenLoader} from "../../components/ui/FullScreenLoader";
import {ProductList} from "../../components/products/ProductList";

export const HomeScreen = () => {
  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ["products", "infinite"],
  //   staleTime: 1000 * 60 * 60, // 1hour
  //   queryFn: () => getProductsByPage(0),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60, // 1hour
    initialPageParam: 0,

    queryFn: async params => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="TesloShop - Productos"
      subTitle="Aplicación administrativa">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          products={data?.pages.flat() ?? []}
          fetchNextPage={fetchNextPage}
        />
      )}
    </MainLayout>
  );
};
