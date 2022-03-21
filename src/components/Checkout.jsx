import "./Checkout.css";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";

function Checkout() {
  const [customerCart] = useRecoilState(productsInCart);

  const allOrders = [];
  allOrders.push(
    customerCart.map((element) => {
      return parseFloat(element.price * element.amount);
    })
  );

  const sumAllOrders = allOrders[0].reduce(
    (prevOrders, Orders) => prevOrders + Orders,
    0
  );

  return (
    <div className="checkout-wrapper">
      <div className="sub-total-wrapper">
        <h2 className="sub-total-title">Summa</h2>
        <h2 className="sub-total">{`${sumAllOrders}:-`}</h2>
      </div>
      <h2 className="shipping">Alltid fri frakt!</h2>
      <button className="checkout-button">Till kassan</button>
    </div>
  );
}

export default Checkout;
