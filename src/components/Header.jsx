import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";

function Header() {
  const customerCart = useRecoilValue(productsInCart);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = useRecoilValue(auth);
  const data = useRecoilValue(userData);
  const [adminLink, setAdminLink] = useState(false);

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

  useEffect(() => {
    if (data.role === "admin") {
      setAdminLink(true);
    } else {
      setAdminLink(false);
    }
  }, [data]);

  return (
    <div>
      <h1>Tung Store</h1>
      <Link to="/">Home</Link>
      <Link to="/produkter">Produkter</Link>
      {adminLink === false &&
        (loggedIn ? (
          <Link to="/minprofil">Min profil</Link>
        ) : (
          <Link to="/login">Logga in</Link>
        ))}
      {adminLink === false && loggedIn === false && (
        <Link to="/skapakonto">Skapa konto</Link>
      )}
      <Link to="/varukorg">{`Varukorg(${sumAllOrders})`}</Link>
      {adminLink === true && <Link to="/adminpanelen">Adminpanelen</Link>}
    </div>
  );
}

export default Header;
