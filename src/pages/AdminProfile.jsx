import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import { Link } from "react-router-dom";
import { products } from "../recoil/products/atom";
import axios from "axios";

function AdminProfile() {
  const [productsList, setProductsList] = useRecoilState(products);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const [data, setData] = useRecoilState(userData);
  const [showProducts, setShowProducts] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showCarts, setShowCarts] = useState(false);
  const [userCarts, setUserCarts] = useState([]);

  async function allProducts() {
    setShowProducts(!showProducts);
    const response = await axios.get("https://k4backend.osuka.dev/products");
    setProductsList(response.data);
  }

  async function allUsers() {
    setShowUsers(!showUsers);
    const response = await axios.get("https://k4backend.osuka.dev/users");
    setUsers(response.data);
  }

  async function allCarts() {
    setShowCarts(!showCarts);
    const response = await axios.get("https://k4backend.osuka.dev/carts");
    setUserCarts(response.data);
  }

  useEffect(() => {
    if (token.length === 0) {
      navigate("/login");
    }
  }, [token, navigate]);

  async function deleteOnClick(id) {
    const response = await axios.delete(
      `https://k4backend.osuka.dev/products/${id}`
    );
    const filteredList = [...productsList].filter(
      (product) => product.id !== response.data.id
    );
    setProductsList(filteredList);
  }

  function logOut() {
    setToken([]);
    setData([]);
    navigate("/login");
  }

  if (token.length === 0)
    return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <div>
      <Helmet>
        <title>Admin - Tung Store</title>
      </Helmet>
      <h3>Admin Profil</h3>
      <h3>Välkommen till adminpanelen</h3>
      <button onClick={allProducts}>Visa en lista med produkter</button>
      {showProducts === true &&
        productsList.map((data) => {
          return (
            <div key={data.id + "a"}>
              <Link key={data.id} to={`/produkter/${data.id}`}>
                {data.title}
              </Link>
              <button
                onClick={() => deleteOnClick(data.id)}
                key={data.id + "b"}
              >
                Delete item
              </button>
            </div>
          );
        })}
      <button onClick={allUsers}>Visa en lista med användare</button>
      {showUsers === true &&
        users.map((data) => {
          return (
            <div key={data.id + "c"}>
              <h3 key={data.id + "d"}>Användar Id: {data.Id}</h3>
              <h3 key={data.id + "e"}>Användarnamn: {data.username}</h3>
              <h3 key={data.id + "f"}>Namn: {data.name.firstname} {data.name.lastname}</h3>
              <h3 key={data.id + "g"}>E-post: {data.email}</h3>
              <h3 key={data.id + "h"}>Telefonnummer: {data.phone}</h3>
            </div>
          );
        })}
      <button onClick={allCarts}>Visa en lista med användares varukorgar</button>
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
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default AdminProfile;
