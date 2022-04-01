import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import { Link } from "react-router-dom";
import { products } from "../recoil/products/atom";
import UserList from "../components/UserList";
import axios from "axios";
import UserCartList from "../components/UserCartList";

function AdminPanel() {
  const [productsList, setProductsList] = useRecoilState(products);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const setData = useSetRecoilState(userData);
  const [showProducts, setShowProducts] = useState(false);

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
      <h3>Adminpanelen</h3>
      <h3>Välkommen till adminpanelen</h3>
      {showProducts ? (
        <button onClick={() => setShowProducts(!showProducts)}>
          Göm listan med produkter
        </button>
      ) : (
        <button onClick={() => setShowProducts(!showProducts)}>
          Visa en lista med produkter
        </button>
      )}
      {showProducts === true &&
        productsList.map((data) => {
          return (
            <div key={data.id + "a"}>
              <Link key={data.id} to={`/adminpanelen/produkter/${data.id}`}>
                {data.title}
              </Link>
              <button
                onClick={() => deleteOnClick(data.id)}
                key={data.id + "b"}
              >
                Ta bort produkt
              </button>
            </div>
          );
        })}
      <UserList />
      <UserCartList />
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default AdminPanel;
