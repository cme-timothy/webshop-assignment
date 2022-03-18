import "./Header.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";

function Header() {
  const [customerCart] = useRecoilState(productsInCart);
  
  const allOrders = [];
  allOrders.push(
    customerCart.map((element) => {
      return parseFloat(element.amount);
    })
  );

  const sumAllOrders = allOrders[0].reduce(
    (prevOrders, Orders) => prevOrders + Orders,
    0
  );

  return (
    <div>
      <h1>Tung Store</h1>
      <Link to="/">Home</Link>
      <Link to="/produkter">Produkter</Link>
      <Link to="/varukorg">{`Varukorg(${sumAllOrders})`}</Link>
    </div>
  );
}

export default Header;
