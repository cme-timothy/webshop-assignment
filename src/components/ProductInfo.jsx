import "./ProductInfo.css";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function ProductInfo(props) {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [amount] = useState(props.data.amount);

  const objSerialized = JSON.stringify(cart);
  localStorage.setItem("userSave", objSerialized);

  const newOrderIndex = cart.findIndex((element) => {
    if (element.id === props.data.id) {
      return true;
    }
    return false;
  });

  const correctOrder = cart.map((element, index) => {
    if (index === newOrderIndex) {
      return element;
    } else {
      return { empty: true };
    }
  });

  function changeAmount() {
    if (correctOrder[newOrderIndex]?.amount) {
      return correctOrder[newOrderIndex].amount;
    } else {
      return 1;
    }
  }

  function add() {
    if (amount === 0) {
      const filteredCart = [...cart].filter(
        (product) => product.id !== props.data.id
      );
      setCart(() => {
        return [
          ...filteredCart,
          {
            id: props.data.id,
            name: props.data.name,
            price: props.data.price,
            pic: props.data.pic,
            amount: changeAmount(),
          },
        ];
      });
    }
  }

  function orderdToggle() {
    if (correctOrder[newOrderIndex]?.amount) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="product-info-wrapper">
      <Helmet>
        <title>{props.data.name} - Tung Store</title>
      </Helmet>
      <img className="product-img" src={props.data.pic} alt="" />
      <h2>{props.data.name}</h2>
      <p className="product-description">{props.data.description}</p>
      <p className="product-price">{props.data.price} kr</p>
      <button onClick={add}>
        {orderdToggle() ? (
          <Link className="go-to-cart" to="/varukorg">Gå till varukorgen</Link>
        ) : (
          "Lägg i varukorgen"
        )}
      </button>
    </div>
  );
}

export default ProductInfo;
