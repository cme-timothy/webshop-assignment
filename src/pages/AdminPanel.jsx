import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import UserList from "../components/UserList";
import UserCartList from "../components/UserCartList";
import ProductListAdmin from "../components/ProductListAdmin";
import { Button, Flex, Heading } from "@chakra-ui/react";

function AdminPanel() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(auth);
  const setData = useSetRecoilState(userData);

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
    <Flex maxW="60em" mr="auto" ml="auto" flexDirection="column">
      <Helmet>
        <title>Admin - Tung Store</title>
      </Helmet>
      <Heading alignSelf="center" mt={4} mb={12}>
        Adminpanelen
      </Heading>
      <ProductListAdmin />
      <UserList />
      <UserCartList />
      <Button w="100%" colorScheme="blue" mt={8} onClick={logOut}>
        Logga ut
      </Button>
    </Flex>
  );
}

export default AdminPanel;
