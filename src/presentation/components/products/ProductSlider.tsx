import React from "react";
import {Image} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {FadeInImage} from "../ui/FadeInImage";

interface ProductSliderProps {
  images: string[];
}

export const ProductSlider = ({images}: ProductSliderProps) => {
  return (
    <>
      {images.length === 0 ? (
        <Image
          source={require("../../../assets/no-product-image.png")}
          style={{width: 300, height: 300, marginHorizontal: 7}}
        />
      ) : (
        <FlatList
          data={images}
          horizontal
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FadeInImage
              uri={item}
              style={{width: 300, height: 300, marginHorizontal: 7}}
            />
          )}
        />
      )}
    </>
  );
};
