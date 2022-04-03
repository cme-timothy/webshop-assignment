import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

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
      <Flex justifyContent="center">
        <Box
          borderWidth={1}
          boxShadow="md"
          textAlign="center"
          bg="white"
          h="60em"
          w="30em"
          p={8}
        >
          <Heading mt={4} mb={12}>
            Skapa ett konto
          </Heading>
          <FormLabel mt={2} mb={1}>Användarnamn</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ett användarnamn"
            name="username"
            type="text"
            value={username}
            onChange={handleUsername}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Lösenord</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ett lösenord"
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>E-post</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in din e-post"
            name="email"
            type="email"
            value={email}
            onChange={handleEmail}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Förnamn</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt förnamn"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstName}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Efternamn</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt efternamn"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleLastName}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Gatuadress</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Gatuadress"
            name="street"
            type="text"
            value={street}
            onChange={handleStreet}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Stad</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Stad"
            name="city"
            type="text"
            value={city}
            onChange={handleCity}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Postnummer</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt postnummer"
            type="number"
            value={zipcode}
            onChange={handleZipcode}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>Telefon</FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt telefonnummer"
            name="phone"
            type="tel"
            value={phone}
            onChange={handlePhone}
            onKeyDown={handleKeyDown}
          />
          <Button
            w="100%"
            colorScheme="blue"
            mt={8}
            type="submit"
            onClick={submit}
          >
            Skapa konto
          </Button>
          {accountCreationFailed ? (
            <Heading mt={4} size="s" color="red">
              Något av det du mattat in är fel!
            </Heading>
          ) : undefined}
        </Box>
      </Flex>
    </div>
  );
}

export default CreateAccount;
