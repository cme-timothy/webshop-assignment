import { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Text, Flex, Heading, Box, Container } from "@chakra-ui/react";

function UserList() {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  async function allUsers() {
    setShowUsers(!showUsers);
    const response = await axios.get("https://k4backend.osuka.dev/users");
    setUsers(response.data);
  }

  return (
    <Flex flexDir="column">
      {showUsers ? (
        <Box>
          <Heading
            w="100%"
            alignSelf="start"
            borderWidth={1}
            cursor="pointer"
            fontSize="xl"
            p="1.5em"
            color="white"
            bg="blue.500"
            onClick={allUsers}
          >
            Göm listan med användare{" "}
          </Heading>
        </Box>
      ) : (
        <Heading
          w="100%"
          alignSelf="start"
          borderWidth={1}
          cursor="pointer"
          fontSize="xl"
          p="1.5em"
          _hover={{ color: "white", bg: "blue.500" }}
          onClick={allUsers}
        >
          Visa en lista med användare
        </Heading>
      )}
      {showUsers === true &&
        users.map((data) => {
          return (
            <Container
              m={0}
              borderWidth={1}
              borderTopWidth={0}
              p="1em"
              key={data.id + nanoid()}
            >
              <h3 key={data.id + nanoid()}>Användar Id: {data.Id}</h3>
              <h3 key={data.id + nanoid()}>Användarnamn: {data.username}</h3>
              <h3 key={data.id + nanoid()}>
                Namn: {data.name.firstname} {data.name.lastname}
              </h3>
              <h3 key={data.id + nanoid()}>E-post: {data.email}</h3>
              <h3 key={data.id + nanoid()}>Telefonnummer: {data.phone}</h3>
            </Container>
          );
        })}
    </Flex>
  );
}

export default UserList;
