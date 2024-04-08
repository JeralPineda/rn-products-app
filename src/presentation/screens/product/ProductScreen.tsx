import React, {useRef} from "react";
import {FlatList, ScrollView, StyleSheet} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {StackScreenProps} from "@react-navigation/stack";

import {MainLayout} from "../../layouts/MainLayout";
import {getProductById} from "../../../actions/products/get-product-by-id";
import {RootStackParams} from "../../navigation/StackNavigator";
import {Layout} from "@ui-kitten/components";
import {FadeInImage} from "../../components/ui/FadeInImage";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductSchema} from "../../../utils/validators/product";
import FormInput from "../../components/ui/form/Input";

interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
}

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  //* Para cuando toque guardar necesitara actualizar ese Id, para evitar salir y hacer otras peticiones
  const productIdRef = useRef(route.params.productId);

  const {data: product} = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const {control, handleSubmit} = useForm<ProductFormData>({
    defaultValues: {
      title: product?.title,
      slug: product?.slug,
      description: product?.description,
      price: product?.price.toString(),
      stock: product?.stock.toString(),
    },
    resolver: zodResolver(ProductSchema),
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
        <Layout style={{marginHorizontal: 10, marginVertical: 5}}>
          <FormInput
            //
            control={control}
            label="Titulo"
            name="title"
            defaultValue={product.title}
            rules={{required: "Correo es requerido"}}
          />
          <FormInput
            //
            control={control}
            label="Slug"
            name="slug"
            defaultValue={product.slug}
            rules={{required: "Correo es requerido"}}
          />
          <FormInput
            //
            control={control}
            label="Descripción"
            name="description"
            multiline
            numberOfLines={5}
            defaultValue={product.description}
            rules={{required: "Correo es requerido"}}
          />
        </Layout>

        {/*  Detalle */}
        <Layout style={styles.detail}>
          <FormInput
            //
            control={control}
            label="Precio"
            name="price"
            defaultValue={product.price.toString()}
            rules={{required: "Correo es requerido"}}
            styleInput={{flex: 1}}
          />
          <FormInput
            //
            control={control}
            label="Inventario"
            name="stock"
            defaultValue={product.stock.toString()}
            rules={{required: "Correo es requerido"}}
            styleInput={{flex: 1}}
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
