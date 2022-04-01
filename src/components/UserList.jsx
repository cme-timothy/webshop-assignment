import { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

function UserList() {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  async function allUsers() {
    setShowUsers(!showUsers);
    const response = await axios.get("https://k4backend.osuka.dev/users");
    setUsers(response.data);
  }

  return (
    <div>
      {showUsers ? (
        <button onClick={allUsers}>Göm listan med användare</button>
      ) : (
        <button onClick={allUsers}>Visa en lista med användare</button>
      )}
      {showUsers === true &&
        users.map((data) => {
          return (
            <div key={data.id + nanoid()}>
              <h3 key={data.id + nanoid()}>Användar Id: {data.Id}</h3>
              <h3 key={data.id + nanoid()}>Användarnamn: {data.username}</h3>
              <h3 key={data.id + nanoid()}>
                Namn: {data.name.firstname} {data.name.lastname}
              </h3>
              <h3 key={data.id + nanoid()}>E-post: {data.email}</h3>
              <h3 key={data.id + nanoid()}>Telefonnummer: {data.phone}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default UserList;
