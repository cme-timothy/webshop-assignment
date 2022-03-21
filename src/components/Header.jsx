import "./Header.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";
import { useState, useEffect } from "react";
import hamburgerMenuImg from "../assets/hamburger_menu/hamburger_menu_green.png";

function Header() {
  const [customerCart] = useRecoilState(productsInCart);
  const [hamburgerMenuToggle, sethamburgerMenuToggle] = useState(false);

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

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("header").style.height = "3.5em";
      document.getElementById("h1").style.fontSize = "1rem";
      document.getElementById("hamburgerMenu").style.width = "30px";
      document.getElementById("mainMenu").style.top = "56px";
    } else {
      document.getElementById("header").style.height = "5em";
      document.getElementById("h1").style.fontSize = "2rem";
      document.getElementById("hamburgerMenu").style.width = "36px";
      document.getElementById("mainMenu").style.top = "80px";
    }
  }

  useEffect(() => {
    if (hamburgerMenuToggle === true) {
      document.getElementById("mainMenu").style.display = "flex";
    } else {
      document.getElementById("mainMenu").style.display = "none";
    }
  });

  function handleClick() {
    sethamburgerMenuToggle(!hamburgerMenuToggle);
  }

  return (
    <div id="header">
      <h1 id="h1">$Tung-Store</h1>
      <div id="mainMenu">
        <Link className="link" onClick={handleClick} to="/">
          /Home
        </Link>
        <Link className="link" onClick={handleClick} to="/produkter">
          /Produkter
        </Link>
        <Link
          className="link"
          onClick={handleClick}
          to="/varukorg"
        >{`/Varukorg(${sumAllOrders})`}</Link>
      </div>
      <img
        id="hamburgerMenu"
        onClick={handleClick}
        src={hamburgerMenuImg}
        alt="Menu icon"
      ></img>
    </div>
  );
}

export default Header;
