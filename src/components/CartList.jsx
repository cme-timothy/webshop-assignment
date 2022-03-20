import "./CartList.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";
import { useState } from "react";

function CartList(props) {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [count, setCount] = useState(props.data.amount);

  const objSerialized = JSON.stringify(cart);
  localStorage.setItem("userSave", objSerialized);

  function handleClick() {
    const filteredCart = [...cart].filter(
      (product) => product.id !== props.data.id
    );
    setCart(filteredCart);
    const objSerialized = JSON.stringify(filteredCart);
    localStorage.setItem("userSave", objSerialized);
  }

  function handleChange(event) {
    const value = event.target.value;
    setCount(value);
  }

  function add(toggle) {
    let addSubToggle = 0;
    if (toggle === true) {
      addSubToggle++;
    } else if (toggle === false && props.data.amount > 1) {
      addSubToggle--;
    }

    const newOrderIndex = cart.findIndex((element) => {
      if (element.id === props.data.id) {
        return true;
      }
      return false;
    });

    const newOrder = {
      id: props.data.id,
      name: props.data.name,
      price: props.data.price,
      pic: props.data.pic,
      amount: count + addSubToggle,
    };

    const correctOrder = cart.map((element, index) => {
      if (index === newOrderIndex) {
        return newOrder;
      } else {
        return element;
      }
    });
    setCart(correctOrder);
  }

  return (
    <div className="cart-list-wrapper">
      <img className="product-cart-img" src={props.data.pic} alt="" />
      <Link className="product-cart-name" to={`/produkter/${props.data.id}`}>{props.data.name}</Link>
      <p className="product-cart-price">{props.data.price}:-</p>
      <button
        onClick={() => {
          add(false);
        }}
      >
        -
      </button>
      <input
        className="product-cart-amount"
        type="number"
        min="1"
        max="99"
        readOnly
        value={count}
        onChange={handleChange}
      ></input>
      <button
        onClick={() => {
          add(true);
        }}
      >
        +
      </button>
      <button className="delete-product" onClick={handleClick}>Ta bort produkt</button>
    </div>
  );
}

export default CartList;
