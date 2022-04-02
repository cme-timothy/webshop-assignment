import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

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
      title: props.data.title,
      price: props.data.price,
      image: props.data.image,
      amount: count + addSubToggle,
    };

    setCount(newOrder.amount);

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
    <div>
      <img src={props.data.image} alt="" />
      <Link to={`/produkter/${props.data.id}`}>{props.data.title}</Link>
      <h2>{props.data.price} €</h2>
      <Button
        colorScheme="yellow"
        size="xs"
        onClick={() => {
          add(false);
        }}
      >
        -
      </Button>
      <input
        type="number"
        min="1"
        max="99"
        readOnly
        value={count}
        onChange={handleChange}
      ></input>
      <Button
        colorScheme="yellow"
        size="xs"
        onClick={() => {
          add(true);
        }}
      >
        +
      </Button>
      <Button colorScheme="yellow" size="xs" onClick={handleClick}>
        Ta bort produkt
      </Button>
    </div>
  );
}

export default CartList;
