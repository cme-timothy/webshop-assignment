import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import { Button } from "@chakra-ui/react"

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [accountCreationFailed, setAccountCreationFailed] = useState(false);
  const navigate = useNavigate();
  const setToken = useSetRecoilState(auth);
  const setData = useSetRecoilState(userData);

  async function submit() {
    setAccountCreationFailed(false);
    await axios
      .post("https://k4backend.osuka.dev/users", {
        email: email,
        username: username,
        password: password,
        role: "user",
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: city,
          street: street,
          number: 0,
          zipcode: zipcode,
        },
        phone: phone,
      })
      .catch((error) => {
        if (error.response.status >= 400 && error.response.status < 500) {
          return setAccountCreationFailed(true);
        }
      });

    async function authenticate() {
      const response = await axios
        .post("https://k4backend.osuka.dev/auth/login", {
          username: username,
          password: password,
        })
        .catch((error) => {
          if (error.response.status >= 400 && error.response.status < 500) {
          }
        });

      if (response !== undefined) {
        setToken(response.data);
        async function getData() {
          const dataResponse = await axios.get(
            `https://k4backend.osuka.dev/users/${response.data.userId}`
          );
          setData(dataResponse.data);
          navigate("/minprofil");
        }
        getData();
      } else {
        return setAccountCreationFailed(true);
      }
    }
    authenticate();
  }

  function handleUsername(event) {
    const value = event.target.value;
    setUsername(value);
  }

  function handlePassword(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function handleEmail(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handleFirstName(event) {
    const value = event.target.value;
    setFirstName(value);
  }

  function handleLastName(event) {
    const value = event.target.value;
    setLastName(value);
  }

  function handleCity(event) {
    const value = event.target.value;
    setCity(value);
  }

  function handleStreet(event) {
    const value = event.target.value;
    setStreet(value);
  }

  function handleZipcode(event) {
    const value = event.target.value;
    setZipcode(value);
  }

  function handlePhone(event) {
    const value = event.target.value;
    setPhone(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  return (
    <div>
      <Helmet>
        <title>Skapa konto - Tung Store</title>
      </Helmet>
      <h3>Skapa konto</h3>
      <div>
        <label>Användarnamn</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={handleUsername}
          onKeyDown={handleKeyDown}
        />
        <label>Lösenord</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
          onKeyDown={handleKeyDown}
        />
        <label>E-post</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
        />
        <label>Förnamn</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstName}
          onKeyDown={handleKeyDown}
        />
        <label>Efternamn</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={handleLastName}
          onKeyDown={handleKeyDown}
        />
        <label>Gatuadress</label>
        <input
          name="street"
          type="text"
          value={street}
          onChange={handleStreet}
          onKeyDown={handleKeyDown}
        />
        <label>Stad</label>
        <input
          name="city"
          type="text"
          value={city}
          onChange={handleCity}
          onKeyDown={handleKeyDown}
        />
        <label>Postnummer</label>
        <input
          name="zipcode"
          type="number"
          value={zipcode}
          onChange={handleZipcode}
          onKeyDown={handleKeyDown}
        />
        <label>Telefon</label>
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={handlePhone}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme='yellow' size='xs' type="submit" onClick={submit}>
          Skapa konto
        </Button>
        {accountCreationFailed ? (
          <h4>Något av det du mattat in är fel!</h4>
        ) : undefined}
      </div>
    </div>
  );
}

export default CreateAccount;
