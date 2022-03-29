import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";

function MyProfile() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const [data, setData] = useRecoilState(userData);

  useEffect(() => {
    if (token.length === 0) {
      navigate("/login");
    }
  }, [token, navigate]);

  function logOut() {
    setToken([]);
    setData([]);
    navigate("/login");
  }

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Min profil - Tung Store</title>
      </Helmet>
      <h3>Min profil</h3>
      <h3>Välkommen till din profil sida</h3>
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default MyProfile;
