import axios from "axios";
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
      <button onClick={allCarts}>
        Visa en lista med användares varukorgar
      </button>
      {showCarts === true &&
        userCarts.map((data) => {
          return (
            <div key={data.id + "j"}>
              <h3 key={data.id + "i"}>Användar Id: {data.userId}</h3>
              <h3 key={data.id + "k"}>Datum: {data.date}</h3>
              <h3>Produkter i varukorgen</h3>
              <h3 key={data.id + "l"}>
                {data.products.map((product) => {
                  return (
                    <div key={product.productId + "m"}>
                      <Link
                        key={product.productId + "n"}
                        to={`/produkter/${product.productId}`}
                      >
                        {productsList[product.productId - 1].title}
                      </Link>
                      <h4 key={product.productId + "o"}>
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
