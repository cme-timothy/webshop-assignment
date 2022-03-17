import "./ProductLink.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { allProductsState } from "../Recoil/products/atom";

function ProductLink(props) {
  const [products, setProducts] = useRecoilState(allProductsState);

  return (
    <div>
      <img
        src="https://wwwtekniskamusee.cdn.triggerfish.cloud/uploads/2016/12/aldre-stationar-dator.jpg"
        alt=""
      />
      <Link to="/produkt">{props.data.name}</Link>
      <p>Beskrivning</p>
      <p>{props.data.price} kr</p>
      <button >Lägg till</button>
    </div>
  );
}

export default ProductLink;
