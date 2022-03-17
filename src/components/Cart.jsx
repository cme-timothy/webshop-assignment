import { Helmet } from "react-helmet-async";
import "./Cart.css";
import { useRecoilState } from "recoil";
import { allProductsState } from "../Recoil/products/atom";

function Cart() {
  const [products, setProducts] = useRecoilState(allProductsState);

  return (
    <div>
      <Helmet>
        <title>Din varukorg - Tung Store</title>
      </Helmet>
      <h3>Varukorg</h3>
    </div>
  );
}

export default Cart;
