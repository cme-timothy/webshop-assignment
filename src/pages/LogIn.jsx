import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Box,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

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
      <Flex justifyContent="center">
        <Box
          borderWidth={1}
          boxShadow="md"
          textAlign="center"
          bg="white"
          h="26em"
          w="30em"
          p={8}
        >
          <Heading mt={4} mb={12}>
            Logga in till ditt Konto
          </Heading>
          <FormLabel mt={2} mb={1}>
            Användarnamn
          </FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt användarnamn"
            name="username"
            type="text"
            value={username}
            onChange={handleUsername}
            onKeyDown={handleKeyDown}
          />
          <FormLabel mt={2} mb={1}>
            Lösenord
          </FormLabel>
          <Input
            id={nanoid()}
            colorScheme="blue"
            placeholder="Skriv in ditt lösenord"
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
            onKeyDown={handleKeyDown}
          />
          <Button
            w="100%"
            colorScheme="blue"
            mt={8}
            type="submit"
            onClick={authenticate}
          >
            Logga in
          </Button>
          {logInFailed ? (
            <Heading mt={4} size="s" color="red">
              Ditt användarnamn eller lösenord är fel!
            </Heading>
          ) : undefined}
        </Box>
      </Flex>
    </div>
  );
}

export default LogIn;
