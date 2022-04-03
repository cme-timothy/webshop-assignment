import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { auth } from "../recoil/auth/atom";
import { userData } from "../recoil/userData/atom";
import { Flex, IconButton, Heading, HStack, StackDivider } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Header() {
  const customerCart = useRecoilValue(productsInCart);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = useRecoilValue(auth);
  const data = useRecoilValue(userData);
  const [adminLink, setAdminLink] = useState(false);
  const [menu, setMenu] = useState("none");

  const allOrders = [];
  allOrders.push(
    customerCart.map((element) => {
      return parseFloat(element.amount);
    })
  );

  const sumAllOrders = allOrders[0].reduce(
    (prevOrders, Orders) => prevOrders + Orders,
    0
  );

  useEffect(() => {
    if (token.length === 0) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    if (data.role === "admin") {
      setAdminLink(true);
    } else {
      setAdminLink(false);
    }
  }, [data]);

  return (
    <Flex
      as="header"
      pos="fixed"
      w="100%"
      bg="white"
      zIndex={1}
      justifyContent="space-between"
      alignItems="center"
      pt="1em"
      pb="1em"
    >
      <Heading
        display={menu === "flex" && "none"}
        bg="blue.500"
        borderRadius="30"
        borderBottomStyle="solid"
        zIndex={3}
        borderWidth={5}
        borderColor="yellow.300"
        color="yellow.300"
        ml="1em"
        p="0.4em"
      >
        Tung-Store
      </Heading>
      <Heading
        display={menu === "none" && "none"}
        zIndex={3}
        color="yellow.300"
        ml="1em"
        p="0.56668em"
      >
        Tung-Store
      </Heading>
      <Flex mr="1em" display={["none", "none", "none", "flex", "flex"]}>
        <HStack fontSize="lg" spacing={3} divider={<StackDivider />} as="nav">
          <Link pr="5em" to="/">
            Home
          </Link>
          <Link to="/produkter">Produkter</Link>
          {adminLink === false &&
            (loggedIn ? (
              <Link to="/minprofil">Min profil</Link>
            ) : (
              <Link to="/login">Logga in</Link>
            ))}
          {adminLink === false && loggedIn === false && (
            <Link to="/skapakonto">Skapa konto</Link>
          )}
          <Link to="/varukorg">{`Varukorg(${sumAllOrders})`}</Link>
          {adminLink === true && <Link to="/adminpanelen">Adminpanelen</Link>}
        </HStack>
      </Flex>
      <IconButton
        onClick={() => {
          setMenu("flex");
        }}
        _focus={{ boxShadow: "none" }}
        variant="unstyled"
        mr="1em"
        icon={<HamburgerIcon w={12} h={12} color="blue.500" />}
        display={
          menu === "none" ? ["flex", "flex", "flex", "none", "none"] : "none"
        }
      ></IconButton>
      <IconButton
        onClick={() => {
          setMenu("none");
        }}
        _focus={{ boxShadow: "none" }}
        variant="unstyled"
        mr="1.25em"
        zIndex={3}
        icon={<CloseIcon w={7} h={7} color="white" />}
        display={menu}
      ></IconButton>
      <Flex
        gap={2}
        display={menu}
        color="white"
        fontSize="xl"
        flexDir="column"
        alignItems="center"
        mr="1em"
        w="100vw"
        h="100vh"
        zIndex={2}
        pos="fixed"
        pt="5em"
        top={0}
        bg="blue.600"
      >
        <Link
          onClick={() => {
            setMenu("none");
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            setMenu("none");
          }}
          to="/produkter"
        >
          Produkter
        </Link>
        {adminLink === false &&
          (loggedIn ? (
            <Link
              onClick={() => {
                setMenu("none");
              }}
              to="/minprofil"
            >
              Min profil
            </Link>
          ) : (
            <Link
              onClick={() => {
                setMenu("none");
              }}
              to="/login"
            >
              Logga in
            </Link>
          ))}
        {adminLink === false && loggedIn === false && (
          <Link
            onClick={() => {
              setMenu("none");
            }}
            to="/skapakonto"
          >
            Skapa konto
          </Link>
        )}
        <Link
          onClick={() => {
            setMenu("none");
          }}
          to="/varukorg"
        >{`Varukorg(${sumAllOrders})`}</Link>
        {adminLink === true && (
          <Link
            onClick={() => {
              setMenu("none");
            }}
            to="/adminpanelen"
          >
            Adminpanelen
          </Link>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
