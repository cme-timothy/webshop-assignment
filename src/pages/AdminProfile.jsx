import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
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

  console.log(data);

  if (token.length === 0)
    return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <div>
      <Helmet>
        <title>Admin - Tung Store</title>
      </Helmet>
      <h3>Admin Profil</h3>
      <h3>Välkommen till adminpanelen</h3>
      <h3>Alla produkter i store</h3>
      {productsList.map((data) => {
        return (
          <div key={data.id + "a"}>
            <Link key={data.id} to={`/produkter/${data.id}`}>
              {data.title}
            </Link>
            <button onClick={() => deleteOnClick(data.id)} key={data.id + "b"}>
              Delete item
            </button>
          </div>
        );
      })}
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default AdminProfile;
