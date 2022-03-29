import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";

function LogIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useRecoilState(auth);
  const [data, setData] = useRecoilState(userData);
  const [logInFailed, setLogInFailed] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    setLogInFailed(false);
    const response = await axios
      .post("https://k4backend.osuka.dev/auth/login", {
        username: userName,
        password: password,
      })
      .catch((error) => {
        if (error.response.status >= 400 && error.response.status < 500) {
          setLogInFailed(true);
        }
      });

    if (response !== undefined) {
      setToken(response.data);
      async function getRole() {
        const dataResponse = await axios.get(
          `https://k4backend.osuka.dev/users/${response.data.userId}`
        );
        setData(dataResponse.data);
        if (dataResponse.data.role === "admin") {
          navigate("/adminprofil");
        } else {
          navigate("/minprofil");
        }
      }
      getRole();
    }
  }

  function handleUserName(event) {
    const value = event.target.value;
    setUserName(value);
  }

  function handlePassword(event) {
    const value = event.target.value;
    setPassword(value);
  }

  return (
    <div>
      <Helmet>
        <title>Logga in - Tung Store</title>
      </Helmet>
      <h3>Logga in</h3>
      <div>
        <input
          name="username"
          type="text"
          value={userName}
          onChange={handleUserName}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit" onClick={handleClick}>
          Logga in
        </button>
        {logInFailed ? (
          <h4>Ditt användarnamn eller lösenord är fel!</h4>
        ) : undefined}
      </div>
    </div>
  );
}

export default LogIn;
