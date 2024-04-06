import {tesloApi} from "../../config/api/tesloApi";
import {TesloProduct} from "../../infrastructure/interfaces/teslo-products.response";
import {ProductMapper} from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20) => {
  try {
    const {data} = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );

    const product = data.map(ProductMapper.tesloProductToEntity);
    return product;
  } catch (error) {
    console.log(
      "🚀 get-products-by-page.ts -> #5 -> error ~",
      JSON.stringify(error, null, 2),
    );
    throw new Error("Error getting products");
  }
};
