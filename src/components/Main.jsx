import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductInfo from "./ProductInfo";
import Cart from "../pages/Cart";
import { products } from "../recoil/products/atom";
import { useRecoilState } from "recoil";


function Main() {
  const [productsList] = useRecoilState(products);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/produkter" element={<ProductList />} />
        {productsList.map((data) => {
          return (
            <Route
              path={`/produkter/${data.id}`}
              key={data.id}
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
