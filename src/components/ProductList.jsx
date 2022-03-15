import "./ProductList.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


function ProductList() {
  return (
    <div>
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <h3>Våra klipp</h3>
      <Link to="/produkt">Produkt</Link>
    </div>
  );
}

export default ProductList;
