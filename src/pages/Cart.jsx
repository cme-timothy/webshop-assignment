import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import CartList from "../components/CartList";
import Checkout from "../components/Checkout";

function Cart() {
  const [customerCart] = useRecoilState(productsInCart);

  function checkoutOn() {
    if (customerCart.length > 0) {
      return true;
    } else {
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
        return <CartList key={data.id} data={data} />;
      })}
      {checkoutOn() ? <Checkout /> : <p>Det finns inget i varukorgen</p>}
    </div>
  );
}

export default Cart;
