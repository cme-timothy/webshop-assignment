import "./ProductLink.css";
import { Link } from "react-router-dom";

function ProductLink(props) {
  return (
    <div className="product-wrapper">
      <Link className="product-link-wrapper" to={`/produkter/${props.data.id}`}>
        <img className="product-img" src={props.data.pic} alt="" />
        <div>
          <p className="product-name">{props.data.name}</p>
          <p className="product-price">{props.data.price} kr</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductLink;
