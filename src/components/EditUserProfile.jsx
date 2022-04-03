import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userData } from "../recoil/userData/atom";
import { Button, FormLabel, Heading, Input, Box } from "@chakra-ui/react";
import { nanoid } from "nanoid";

function EditUserProfile() {
  const [data, setData] = useRecoilState(userData);
  const [editProfile, setEditProfile] = useState(false);
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  async function submit() {
    const updatedUser = await axios.put(
      `https://k4backend.osuka.dev/users/${data.id}`,
      {
        ...(email !== "" && { email: email }),
        ...(email === "" && { email: data.email }),
        username: data.username,
        ...(password !== "" && { password: password }),
        ...(password === "" && { password: data.password }),
        role: "user",
        name: {
          ...(firstname !== "" && { firstname: firstname }),
          ...(firstname === "" && { firstname: data.name.firstname }),
          ...(lastname !== "" && { lastname: lastname }),
          ...(lastname === "" && { lastname: data.name.lastname }),
        },
        address: {
          city: data.address.city,
          street: data.address.street,
          zipcode: data.address.zipcode,
          number: 0,
        },
        phone: data.phone,
      }
    );
    setData(updatedUser.data);
    setEditProfile(!editProfile);
    setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
  }

  function hanldePassword(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function handlefirstname(event) {
    const value = event.target.value;
    setFirstname(value);
  }

  function handleLastname(event) {
    const value = event.target.value;
    setLastname(value);
  }

  function handleEmail(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  function showInput() {
    setEditProfile(!editProfile);
  }

  return (
    <Box borderWidth={1} boxShadow="md" bg="white" p={8}>
      <Heading align="left" borderBottomWidth={1}>
        Profil
      </Heading>
      <Heading mt="0.7em" fontSize="lg" p="0.2em 0 0.2em 0">
        Förnamn
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.name.firstname}
      </FormLabel>
      {editProfile === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          type="text"
          placeholder="Skriv in ditt förnamn"
          value={firstname}
          onChange={handlefirstname}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        Efternamn
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.name.lastname}
      </FormLabel>
      {editProfile === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          type="text"
          placeholder="Skriv in ditt efternamn"
          value={lastname}
          onChange={handleLastname}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        Lösenord
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        Av säkerhetsskäll visas inte lösenord
      </FormLabel>
      {editProfile === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          placeholder="Skriv in nytt lösenord"
          type="password"
          value={password}
          onChange={hanldePassword}
          onKeyDown={handleKeyDown}
        ></Input>
      )}

      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        E-post
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.email}
      </FormLabel>
      {editProfile === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          type="email"
          placeholder="Skriv in din e-post"
          value={email}
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      {editProfile ? (
        <Button w="100%" colorScheme="blue" mt={2} onClick={submit}>
          Uppdatera profilen
        </Button>
      ) : (
        <Button w="100%" colorScheme="blue" mt={2} onClick={showInput}>
          Redigera profil
        </Button>
      )}
    </Box>
  );
}

export default EditUserProfile;
