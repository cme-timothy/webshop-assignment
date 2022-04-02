import { userData } from "../recoil/userData/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useState } from "react";
import { Button } from '@chakra-ui/react'

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
    <div>
      <h2>Adress</h2>
      <h4>Gatuadress: {data.address.street}</h4>
      {editAddress === true && (
        <input
          type="text"
          value={street}
          onChange={handleStreet}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      <h4>Stad: {data.address.city}</h4>
      {editAddress === true && (
        <input
          type="text"
          value={city}
          onChange={handleCity}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      <h4>Postnummer: {data.address.zipcode}</h4>
      {editAddress === true && (
        <input
          type="number"
          value={zipcode}
          onChange={handleZipcode}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      <h4>Telefonnummer: {data.phone}</h4>
      {editAddress === true && (
        <input
          type="tel"
          value={phone}
          onChange={handlePhone}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      {editAddress ? (
        <Button colorScheme='yellow' size='xs' onClick={submit}>Uppdatera adressen</Button>
      ) : (
        <Button colorScheme='yellow' size='xs' onClick={showInput}>Redigera adress</Button>
      )}
    </div>
  );
}

export default EditUserAddress;
