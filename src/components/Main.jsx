import "./Main.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import ProductList from "./ProductList";
import ProductInfo from "./ProductInfo";
import Cart from "./Cart";

function Main() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/produkter" element={<ProductList />} />
        <Route path="/produkt" element={<ProductInfo />} />
        <Route path="/varukorg" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default Main;
