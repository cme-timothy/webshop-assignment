import "./ProductLink.css";
import { Link } from "react-router-dom";

function ProductLink(props) {
  return (
    <div className="product-wrapper">
      <img className="product-img" src={props.data.pic} alt="" />
      <div>
        <Link className="product-name" to={`/produkter/${props.data.id}`}>
          {props.data.name}
        </Link>
        <p className="product-price">{props.data.price} kr</p>
      </div>
    </div>
  );
}

export default ProductLink;
