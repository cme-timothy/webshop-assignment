import "./ProductInfo.css";
import { useRecoilState } from "recoil";
import { productsInCart } from "../Recoil/products/atom";
import { useState } from "react";

function ProductInfo(props) {
  const [addToCart, setAddToCart] = useRecoilState(productsInCart);
  const [amount, setAmount] = useState(props.data.amount);

  const objSerialized = JSON.stringify(addToCart);
  localStorage.setItem("userSave", objSerialized);

  function handleChange(event) {
    const value = event.target.value;
    setAmount(value);
  }

  function add() {
    if (amount === 0) {
      const filteredCart = [...addToCart].filter(
        (product) => product.id !== props.data.id
      );
      setAddToCart(() => {
        return [
          ...filteredCart,
          {
            id: props.data.id,
            name: props.data.name,
            price: props.data.price,
            pic: props.data.pic,
            amount: 1,
          },
        ];
      });
    }
  }

  return (
    <div>
      <img src={props.data.pic} alt="" />
      <h2>{props.data.name}</h2>
      <p>{props.data.description}</p>
      <p>{props.data.price} kr</p>
      <button onClick={add}>Lägg i varukorgen</button>
    </div>
  );
}

export default ProductInfo;
