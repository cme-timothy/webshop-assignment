import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(auth);
  const setData = useSetRecoilState(userData);
  const [logInFailed, setLogInFailed] = useState(false);
  const navigate = useNavigate();

  async function authenticate() {
    setLogInFailed(false);
    const response = await axios
      .post("https://k4backend.osuka.dev/auth/login", {
        username: username,
        password: password,
      })
      .catch((error) => {
        if (error.response.status >= 400 && error.response.status < 500) {
          setLogInFailed(true);
        }
      });

    if (response !== undefined) {
      setToken(response.data);
      async function getData() {
        const dataResponse = await axios.get(
          `https://k4backend.osuka.dev/users/${response.data.userId}`
        );
        setData(dataResponse.data);
        if (dataResponse.data.role === "admin") {
          navigate("/adminpanelen");
        } else {
          navigate("/minprofil");
        }
      }
      getData();
    }
  }

  function handleUsername(event) {
    const value = event.target.value;
    setUsername(value);
  }

  function handlePassword(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      authenticate();
    }
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
          value={username}
          onChange={handleUsername}
          onKeyDown={handleKeyDown}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={authenticate}>
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
