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

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("header").style.height = "3.5em";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("header").style.color = "#00ff41";
      document.getElementById("h1").style.fontSize = "1rem";
      document.getElementsByClassName("link")[0].style.color = "#00ff41";
      document.getElementsByClassName("link")[1].style.color = "#00ff41";
      document.getElementsByClassName("link")[2].style.color = "#00ff41";
    } else {
      document.getElementById("header").style.height = "5em";
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("header").style.color = "black";
      document.getElementById("h1").style.fontSize = "2rem";
      document.getElementsByClassName("link")[0].style.color = "black";
      document.getElementsByClassName("link")[1].style.color = "black";
      document.getElementsByClassName("link")[2].style.color = "black";
    }
  }

  console.log(document.getElementsByClassName("link"));
  console.log(document.getElementById("header"));

  return (
    <div id="header">
      <h1 id="h1">$Tung-Store</h1>
      <div className="main-menu">
        <Link className="link" to="/">
          /Home
        </Link>
        <Link className="link" to="/produkter">
          /Produkter
        </Link>
        <Link
          className="link"
          to="/varukorg"
        >{`/Varukorg(${sumAllOrders})`}</Link>
      </div>
    </div>
  );
}

export default Header;
