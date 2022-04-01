import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { products } from "../recoil/products/atom";

function UserCartList() {
  const [showCarts, setShowCarts] = useState(false);
  const [userCarts, setUserCarts] = useState([]);
  const productsList = useRecoilValue(products);

  async function allCarts() {
    setShowCarts(!showCarts);
    const response = await axios.get("https://k4backend.osuka.dev/carts");
    setUserCarts(response.data);
  }

  return (
    <div>
      {showCarts ? (
        <button onClick={allCarts}>Göm listan med användares varukorgar</button>
      ) : (
        <button onClick={allCarts}>
          Visa en lista med användares varukorgar
        </button>
      )}
      {showCarts === true &&
        userCarts.map((data) => {
          return (
            <div key={data.id + nanoid()}>
              <h3 key={data.id + nanoid()}>Användar Id: {data.userId}</h3>
              <h3 key={data.id + nanoid()}>Datum: {data.date}</h3>
              <h3>Produkter i varukorgen</h3>
              <h3 key={data.id + nanoid()}>
                {data.products.map((product) => {
                  return (
                    <div key={product.productId + nanoid()}>
                      <Link
                        key={product.productId + nanoid()}
                        to={`/produkter/${product.productId}`}
                      >
                        {productsList[product.productId - 1].title}
                      </Link>
                      <h4 key={product.productId + nanoid()}>
                        Kvantitet: {product.quantity}
                      </h4>
                    </div>
                  );
                })}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default UserCartList;
