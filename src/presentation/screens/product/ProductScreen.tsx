import {Text} from "@ui-kitten/components";
import React, {useRef} from "react";
import {MainLayout} from "../../layouts/MainLayout";
import {useQuery} from "@tanstack/react-query";
import {getProductById} from "../../../actions/products/get-product-by-id";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParams} from "../../navigation/StackNavigator";

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
      <Text>ProductScreen</Text>
    </MainLayout>
  );
};
