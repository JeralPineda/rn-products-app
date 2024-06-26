/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {StackScreenProps} from "@react-navigation/stack";
import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Layout, useTheme} from "@ui-kitten/components";
import {zodResolver} from "@hookform/resolvers/zod";

import {MainLayout} from "../../layouts/MainLayout";
import {getProductById} from "../../../actions/products/get-product-by-id";
import {RootStackParams} from "../../navigation/StackNavigator";
import {ProductSchema} from "../../../utils/validators/product";
import FormInput from "../../components/ui/form/Input";
import {Gender, Product, Size} from "../../../domain/entities/product";
import {updateCreateProduct} from "../../../actions/products/update-create-product";
import {useUistore} from "../../store";
import {ProductSlider} from "../../components/products/ProductSlider";

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  price: number | string;
  stock: number | string;
  gender: Gender;
  images: string[];
  tags: string[];
  sizes: Size[];
  id: string;
}

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  //* Para cuando toque guardar necesitara actualizar ese Id, para evitar salir y hacer otras peticiones
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const addNotification = useUistore(state => state.addNotification);
  const queryClient = useQueryClient();

  const {data: product} = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      const message =
        data?.id === "new"
          ? "Producto creado correctamente"
          : "Producto actualizado correctamente";

      queryClient.invalidateQueries({queryKey: ["products", "infinite"]});
      queryClient.invalidateQueries({queryKey: ["product", data.id]});

      addNotification({
        message: [message],
        type: "success",
      });
    },
    onError(err) {
      console.log(
        "🚀 ProductScreen.tsx -> #58 -> error ~",
        JSON.stringify(err, null, 2),
      );
      addNotification({
        message: [err.message],
        type: "error",
      });
    },
  });

  const {control, handleSubmit, setValue, watch} = useForm<ProductFormData>({
    defaultValues: {
      id: product?.id,
      title: product?.title,
      slug: product?.slug,
      description: product?.description,
      price: product?.price.toString(),
      stock: product?.stock.toString(),
      gender: product?.gender,
      tags: product?.tags,
      images: product?.images,
      sizes: product?.sizes,
    },
    resolver: zodResolver(ProductSchema),
  });

  //Get Sizes Values from useForm
  const defaultSizes = watch("sizes");
  const genderValue = watch("gender");

  useEffect(() => {
    setValue("sizes", product?.sizes!);
    setValue("gender", product?.gender!);
  }, [product, setValue]);

  const onSubmit = (data: ProductFormData) => {
    const newData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };
    mutate(newData);
  };

  if (!product) {
    return <MainLayout title="Cargando" />;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio: ${product.price}`}>
      <ScrollView style={styles.container}>
        {/* Imágenes del producto */}
        <Layout>
          <ProductSlider images={product.images} />
        </Layout>

        {/* Formulario */}
        <Layout style={styles?.formContainer}>
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

        {/* Precio e inventario */}
        <Layout style={styles.detail}>
          <FormInput
            //
            control={control}
            label="Precio"
            type="numeric"
            name="price"
            defaultValue={product.price.toString()}
            rules={{required: "Correo es requerido"}}
            styleInput={{flex: 1}}
          />
          <FormInput
            //
            control={control}
            label="Inventario"
            type="numeric"
            name="stock"
            defaultValue={product.stock.toString()}
            rules={{required: "Correo es requerido"}}
            styleInput={{flex: 1}}
          />
        </Layout>

        {/* Selectores */}
        <ButtonGroup style={styles.selectors} size="small" appearance="outline">
          {sizes?.map(size => (
            <Button
              onPress={() =>
                setValue(
                  "sizes",
                  defaultSizes?.includes(size)
                    ? defaultSizes?.filter(s => s !== size)
                    : [...defaultSizes!, size],
                )
              }
              style={{
                flex: 1,
                backgroundColor: defaultSizes?.includes(size)
                  ? theme["color-primary-200"]
                  : undefined,
              }}
              key={size}>
              {size}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup style={styles.selectors} size="small" appearance="outline">
          {genders.map(gender => (
            <Button
              onPress={() => setValue("gender", gender)}
              style={{
                flex: 1,
                backgroundColor:
                  genderValue === gender
                    ? theme["color-primary-200"]
                    : undefined,
              }}
              key={gender}>
              {gender}
            </Button>
          ))}
        </ButtonGroup>

        {/* Submit Button */}
        <Button
          style={{margin: 15}}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}>
          Guardar
        </Button>

        <Layout style={{height: 200}} />
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  detail: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    gap: 10,
  },
  selectors: {
    margin: 2,
    marginTop: 30,
    marginHorizontal: 15,
  },
});
