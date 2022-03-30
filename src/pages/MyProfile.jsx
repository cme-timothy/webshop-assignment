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

  function changeProfile() {

  }

  function changeAdress() {

  }

  console.log(data);

  if (token.length === 0) return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <div>
      <Helmet>
        <title>Min profil - Tung Store</title>
      </Helmet>
      <h3>Min profil</h3>
      <h3>Välkommen till din profilsida</h3>
      <h2>Profil</h2>
      <h4>Namn: {data.name.firstname} {data.name.lastname}</h4>
      <h4>Lösenord: Av säkerhetsskäll visas inte lösenord</h4>
      <h4>E-post: {data.email}</h4>
      <button onClick={changeProfile}>Redigera profil</button>
      <h2>Adress</h2>
      <h4>Gatuadress {data.address.street}</h4>
      <h4>Stad: {data.address.city}</h4>
      <h4>Postnummer: {data.address.zipcode}</h4>
      <h4>Telefonnummer: {data.phone}</h4>
      <button onClick={changeAdress}>Redigera adress</button>
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default MyProfile;
