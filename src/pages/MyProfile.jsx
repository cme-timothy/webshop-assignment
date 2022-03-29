import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";

function MyProfile() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);

  async function getUser() {
    const response = await axios.get(
      `https://k4backend.osuka.dev/users/${token.userId}`
    );
    setUserData(response);
  }

  useEffect(() => {
    if (token.length === 0) {
      navigate("/logIn");
    } else {
      getUser();
    }
  }, [token]);

  function logOut() {
    setToken([]);
    navigate("/logIn");
  }

  if (userData.length === 0) return <h3>Loading...</h3>;

  return (
    <div>
      <Helmet>
        <title>Min profil - Tung Store</title>
      </Helmet>
      <h3>Min profil</h3>
      <h3>Välkommen till din profil sida {userData.id}</h3>
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default MyProfile;
