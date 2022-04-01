import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userData } from "../recoil/userData/atom";

function EditUserProfile() {
  const [data, setData] = useRecoilState(userData);
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState("");
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
        ...(username !== "" && { username: username }),
        ...(username === "" && { username: data.username }),
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
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
  }

  function handleUsername(event) {
    const value = event.target.value;
    setUsername(value);
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
    <div>
      <h2>Profil</h2>
      <h4>Användarnamn: {data.username}</h4>
      {editProfile === true && (
        <input
          type="text"
          value={username}
          onChange={handleUsername}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      <h4>Lösenord: Av säkerhetsskäll visas inte lösenord</h4>
      {editProfile === true && (
        <input
          type="password"
          value={password}
          onChange={hanldePassword}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      <h4>
        Namn: {data.name.firstname} {data.name.lastname}
      </h4>
      {editProfile === true && (
        <input
          type="text"
          value={firstname}
          onChange={handlefirstname}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      {editProfile === true &&
        ((<label>Efternamn</label>),
        (
          <input
            type="text"
            value={lastname}
            onChange={handleLastname}
            onKeyDown={handleKeyDown}
          ></input>
        ))}
      <h4>E-post: {data.email}</h4>
      {editProfile === true && (
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
        ></input>
      )}
      {editProfile ? (
        <button onClick={submit}>Uppdatera profilen</button>
      ) : (
        <button onClick={showInput}>Redigera profil</button>
      )}
    </div>
  );
}

export default EditUserProfile;
