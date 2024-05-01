import {tesloApi} from "../../config/api/tesloApi";
import {Gender, Product} from "../../domain/entities/product";
import {TesloProduct} from "../../infrastructure/interfaces/teslo-products.response";
import {ProductMapper} from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Product = {
  id: "",
  title: "Nuevo producto",
  description: "",
  price: 0,
  stock: 0,
  images: [],
  slug: "",
  gender: Gender.Unisex,
  sizes: [],
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") {
    return emptyProduct;
  }

  try {
    const {data} = await tesloApi.get<TesloProduct>(`/products/${id}`);

    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(
      "🚀 get-product-by-id.ts -> #13 -> error ~",
      JSON.stringify(error, null, 2),
    );
    throw new Error(`Error getting product by id: ${id}`);
  }
};
