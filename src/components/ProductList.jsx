import "./ProductList.css";
import { nanoid } from "nanoid";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ProductLink from "./ProductLink";
import productData from "../data/productData";

function ProductList() {
  const [products] = useState(productData);

  return (
    <div className="h3-wrapper">
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <h3>Våra klipp</h3>
      <div className="product-list-wrapper">
        {products.map((data) => {
          return <ProductLink key={nanoid()} data={data} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
