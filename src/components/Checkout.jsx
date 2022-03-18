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
    <div>
      <h2>Frakt</h2>
      <h2>0:-</h2>
      <h2>Summa</h2>
      <h2>{`${sumAllOrders}:-`}</h2>
      <button>Till kassan</button>
    </div>
  );
}

export default Checkout;