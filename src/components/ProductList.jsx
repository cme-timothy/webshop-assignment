import "./ProductList.css";
import ProductLink from "./ProductLink";
import { nanoid } from "nanoid";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { allProductsState } from "../Recoil/products/atom";

function ProductList() {
  const [products, setProducts] = useRecoilState(allProductsState);

  return (
    <div>
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <h3>Våra klipp</h3>
      {products.map((data) => {
        return <ProductLink key={nanoid()} data={data} />;
      })}
    </div>
  );
}

export default ProductList;
