import React from "react";
import {StyleSheet} from "react-native";
import {Product} from "../../../domain/entities/product";
import {Layout, List} from "@ui-kitten/components";
import {ProductCard} from "./ProductCard";

interface ProductListProps {
  products: Product[];
  //TODO fetch nextPage
}

export const ProductList = ({products}: ProductListProps) => {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 150,
  },
});
