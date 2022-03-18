import "./Main.css";
import { Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import Home from "./Home";
import ProductList from "./ProductList";
import ProductInfo from "./ProductInfo";
import Cart from "./Cart";
import productData from "../data/productData";

function Main() {
  const [products, setProducts] = useState(productData);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/produkter" element={<ProductList />} />
        {products.map((data) => {
          return (
            <Route
              path={`/produker/${data.id}`}
              key={nanoid()}
              element={<ProductInfo data={data} />}
            />
          );
        })}
        <Route path="/varukorg" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default Main;
