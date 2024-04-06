import React, {useState} from "react";
import {RefreshControl, StyleSheet} from "react-native";
import {Product} from "../../../domain/entities/product";
import {Layout, List} from "@ui-kitten/components";
import {ProductCard} from "./ProductCard";

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: ProductListProps) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    //Sleep 1
    await new Promise((resolve: any) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={styles.separator} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 150,
  },
});
