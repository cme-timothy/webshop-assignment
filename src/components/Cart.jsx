import "./Cart.css";
import { Helmet } from "react-helmet-async";
import { nanoid } from "nanoid";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";
import CartList from "./CartList";
import Checkout from "./Checkout";

function Cart() {
  const [customerCart, setCustomerCart] = useRecoilState(productsInCart);

  function checkoutOn() {
    if (customerCart.length > 0) return true;
    else {
      return false;
    }
  }
  return (
    <div>
      <Helmet>
        <title>Din varukorg - Tung Store</title>
      </Helmet>
      <h3>Varukorg</h3>
      {customerCart.map((data) => {
        return <CartList key={nanoid()} data={data} />;
      })}
      {checkoutOn() ? <Checkout /> : <p>Det finns inget i varukorgen</p>}
    </div>
  );
}

export default Cart;
