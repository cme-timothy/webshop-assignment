import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductInfo() {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [amount] = useState(0);
  const [product, setProduct] = useState([]);
  const params = useParams();
  

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `https://k4backend.osuka.dev/products/${params.productId}`
      );
      setProduct(response.data);
    }
    getProduct();
    return () => console.log("cleanup");
  }, [params.productId]);

  if (product.length === 0) return <h3>Loading...</h3>;

  const objSerialized = JSON.stringify(cart);
  localStorage.setItem("userSave", objSerialized);

  const newOrderIndex = cart.findIndex((element) => {
    if (element.id === product.id) {
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
        (thisProduct) => thisProduct.id !== product.id
      );
      setCart(() => {
        return [
          ...filteredCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
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
      <img src={product.image} alt="" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price} €</p>
      <button onClick={add}>
        {orderdToggle() ? (
          <Link to="/varukorg">
            Gå till varukorgen
          </Link>
        ) : (
          "Lägg i varukorgen"
        )}
      </button>
    </div>
  );
}

export default ProductInfo;
