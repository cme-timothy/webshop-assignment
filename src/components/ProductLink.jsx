import { Link } from "react-router-dom";

function ProductLink(props) {
  return (
    <div>
      <img src={props.data.image} alt="" />
      <Link key={props.data.id} to={`/produkter/${props.data.id}`}>{props.data.title}</Link>
      <p>{props.data.price} €</p>
    </div>
  );
}

export default ProductLink;
