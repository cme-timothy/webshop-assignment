import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";

function AdminProfile() {
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

  if (token.length === 0) return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <div>
      <Helmet>
        <title>Admin - Tung Store</title>
      </Helmet>
      <h3>Admin Profil</h3>
      <h3>Välkommen till adminpanelen</h3>
      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}

export default AdminProfile;
