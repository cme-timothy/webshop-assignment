import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import ProductLink from "../components/ProductLink";
import { products } from "../recoil/products/atom";
import { useRecoilState } from "recoil";
import axios from "axios";

function ProductList() {
  const [productsList, setProductsList] = useRecoilState(products);

  useEffect(() => {
    async function allProducts() {
      const response = await axios.get("https://k4backend.osuka.dev/products");
      setProductsList(response.data);
    }
    allProducts();
  });

  return (
    <div>
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <h3>Våra klipp</h3>
      {productsList.map((data) => {
        return <ProductLink key={data.id} data={data} />;
      })}
    </div>
  );
}

export default ProductList;
