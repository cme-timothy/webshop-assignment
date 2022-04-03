import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import EditUserProfile from "../components/EditUserProfile";
import EditUserAddress from "../components/EditUserAddress";
import { Button, Flex, Heading, Grid, GridItem } from "@chakra-ui/react";

function MyProfile() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const [data, setData] = useRecoilState(userData);

  useEffect(() => {
    if (token.length === 0) {
      navigate("/login");
    }
  }, [token, navigate]);

  function logOut() {
    setToken([]);
    setData([]);
    navigate("/login");
  }

  if (token.length === 0)
    return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <Flex flexDirection="column">
      <Helmet>
        <title>Min profil - Tung Store</title>
      </Helmet>
      <Heading
      alignSelf="center"
        mt={4}
        mb={12}
      >{`Hej! ${data.name.firstname}, välkommen till din profilsida`}</Heading>
      <Grid gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )" gap={5}>
        <EditUserProfile />
        <EditUserAddress />
      </Grid>
      <Button w="100%" colorScheme="blue" mt={8} onClick={logOut}>
        Logga ut
      </Button>
    </Flex>
  );
}

export default MyProfile;
