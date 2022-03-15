import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <h1>Tung Store</h1>
      <Link to="/">Home</Link>
      <Link to="/produkter">Produkter</Link>
      <Link to="/varukorg">Varukorg</Link>
    </div>
  );
}

export default Header;
