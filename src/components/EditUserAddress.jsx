import { userData } from "../recoil/userData/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useState } from "react";
import { Button, FormLabel, Heading, Input, Box, Flex } from "@chakra-ui/react";
import { nanoid } from "nanoid";

function EditUserAddress() {
  const [data, setData] = useRecoilState(userData);
  const [editAddress, setEditAddress] = useState(false);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  async function submit() {
    const updatedUser = await axios.put(
      `https://k4backend.osuka.dev/users/${data.id}`,
      {
        email: data.email,
        username: data.username,
        password: data.password,
        role: "user",
        name: {
          firstname: data.name.firstname,
          lastname: data.name.lastname,
        },
        address: {
          ...(city !== "" && { city: city }),
          ...(city === "" && { city: data.address.city }),
          ...(street !== "" && { street: street }),
          ...(street === "" && { street: data.address.street }),
          ...(zipcode !== "" && { zipcode: zipcode }),
          ...(zipcode === "" && { zipcode: data.address.zipcode }),
          number: 0,
        },
        ...(phone !== "" && { phone: phone }),
        ...(phone === "" && { phone: data.phone }),
      }
    );
    setData(updatedUser.data);
    setEditAddress(!editAddress);
    setCity("");
    setStreet("");
    setZipcode("");
    setPhone("");
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

  function showInput() {
    setEditAddress(!editAddress);
  }

  return (
    <Box borderWidth={1} boxShadow="md" bg="white" p={8}>
      <Heading align="left" borderBottomWidth={1}>
        Adress
      </Heading>
      <Heading mt="0.7em" fontSize="lg" p="0.2em 0 0.2em 0">
        Gatuadress
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.address.street}
      </FormLabel>
      {editAddress === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          type="text"
          placeholder="Gatuadress"
          value={street}
          onChange={handleStreet}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        Stad
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.address.city}
      </FormLabel>
      {editAddress === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          type="text"
          placeholder="Stad"
          value={city}
          onChange={handleCity}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        Postnummer
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.address.zipcode}
      </FormLabel>
      {editAddress === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          placeholder="Skriv in ditt postnummer"
          type="number"
          value={zipcode}
          onChange={handleZipcode}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      <Heading fontSize="lg" p="0.2em 0 0.2em 0">
        Telefonnummer
      </Heading>
      <FormLabel fontSize="lg" p="0.2em 0 0.2em 0">
        {data.phone}
      </FormLabel>
      {editAddress === true && (
        <Input
          mb="1em"
          id={nanoid()}
          colorScheme="blue"
          placeholder="Skrin in ditt telefonnummer"
          type="tel"
          value={phone}
          onChange={handlePhone}
          onKeyDown={handleKeyDown}
        ></Input>
      )}
      {editAddress ? (
        <Button
          alignSelf="flex-end"
          w="100%"
          colorScheme="blue"
          mt={2}
          onClick={submit}
        >
          Uppdatera adressen
        </Button>
      ) : (
        <Button w="100%" colorScheme="blue" mt={2} onClick={showInput}>
          Redigera adress
        </Button>
      )}
    </Box>
  );
}

export default EditUserAddress;
