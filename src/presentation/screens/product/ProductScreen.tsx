import React, {useRef} from "react";
import {FlatList, ScrollView, StyleSheet} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {StackScreenProps} from "@react-navigation/stack";

import {MainLayout} from "../../layouts/MainLayout";
import {getProductById} from "../../../actions/products/get-product-by-id";
import {RootStackParams} from "../../navigation/StackNavigator";
import {Input, Layout} from "@ui-kitten/components";
import {FadeInImage} from "../../components/ui/FadeInImage";

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  //* Para cuando toque guardar necesitara actualizar ese Id, para evitar salir y hacer otras peticiones
  const productIdRef = useRef(route.params.productId);

  const {data: product} = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  //useMutation

  if (!product) {
    return <MainLayout title="Cargando" />;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio: ${product.price}`}>
      <ScrollView style={styles.container}>
        {/* Imágenes del producto */}
        <Layout>
          {/* Validar cuando no hay imágenes */}
          <FlatList
            data={product.images}
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
        </Layout>

        {/* Formulario */}
        <Layout style={{marginHorizontal: 10}}>
          <Input
            label="Titulo"
            value={product.title}
            style={{marginVertical: 5}}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{marginVertical: 5}}
          />
          <Input
            label="Descripcion"
            value={product.description}
            multiline
            numberOfLines={5}
            style={{marginVertical: 5}}
          />
        </Layout>

        {/*  Detalle */}
        <Layout style={styles.detail}>
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{flex: 1}}
          />
          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{flex: 1}}
          />
        </Layout>
        <Layout style={{height: 200}} />
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detail: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    gap: 10,
  },
});
