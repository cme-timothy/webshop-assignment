import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { useState } from "react";

function ProductInfo(props) {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [amount] = useState(0);

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
            title: props.data.title,
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
    <div>
      <img src={props.data.pic} alt="" />
      <h2>{props.data.title}</h2>
      <p>{props.data.description}</p>
      <p>{props.data.price} kr</p>
      <button onClick={add}>
        {orderdToggle() ? "Gå till varukorgen" : "Lägg i varukorgen"}
      </button>
    </div>
  );
}

export default ProductInfo;
