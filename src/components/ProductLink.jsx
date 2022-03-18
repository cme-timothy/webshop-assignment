import "./ProductLink.css";
import { Link } from "react-router-dom";

function ProductLink(props) {
  return (
    <div>
      <img src={props.data.pic} alt="" />
      <Link to={`/produkter/${props.data.id}`}>{props.data.name}</Link>
      <p>{props.data.price} kr</p>
    </div>
  );
}

export default ProductLink;
