import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { auth } from "../recoil/auth/atom";

function Header() {
  const [customerCart] = useRecoilState(productsInCart);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useRecoilState(auth);
  
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

  useEffect(() => {
    if (token.length === 0) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <div>
      <h1>Tung Store</h1>
      <Link to="/">Home</Link>
      <Link to="/produkter">Produkter</Link>
      {loggedIn ? <Link to="/minProfil">Min profil</Link> : <Link to="/login">Logga in</Link>}
      <Link to="/skapakonto">Skapa konto</Link>
      <Link to="/varukorg">{`Varukorg(${sumAllOrders})`}</Link>
    </div>
  );
}

export default Header;
