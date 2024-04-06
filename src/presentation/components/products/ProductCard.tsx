/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {Image, StyleSheet} from "react-native";
import {Product} from "../../../domain/entities/product";
import {Card, Text} from "@ui-kitten/components";
import {FadeInImage} from "../ui/FadeInImage";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  return (
    <Card style={styles.card}>
      {product?.images.length === 0 ? (
        <Image
          source={require("../../../assets/no-product-image.png")}
          style={{width: "100%", height: 200}}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{flex: 1, height: 200, width: "100%"}}
        />
      )}

      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 3,
  },
  title: {
    textAlign: "center",
  },
});
