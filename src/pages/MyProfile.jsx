import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import EditUserProfile from "../components/EditUserProfile";
import EditUserAddress from "../components/EditUserAddress";

function MyProfile() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const setData = useSetRecoilState(userData);

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

  if (token.length === 0)
    return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <div>
      <Helmet>
        <title>Min profil - Tung Store</title>
      </Helmet>
      <h3>Min profil</h3>
      <h3>Välkommen till din profilsida</h3>
      <EditUserProfile />
      <EditUserAddress />
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default MyProfile;
