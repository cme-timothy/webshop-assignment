import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { useState } from "react";
import {
  Text,
  Flex,
  Box,
  Container,
  Button,
  Image,
  Input,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

function CartList(props) {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [count, setCount] = useState(props.data.amount);
  const [screenLarge] = useMediaQuery("(min-width: 810px)");

  const objSerialized = JSON.stringify(cart);
  localStorage.setItem("userSave", objSerialized);

  function handleClick() {
    const filteredCart = [...cart].filter(
      (product) => product.id !== props.data.id
    );
    setCart(filteredCart);
    const objSerialized = JSON.stringify(filteredCart);
    localStorage.setItem("userSave", objSerialized);
  }

  function handleChange(event) {
    const value = event.target.value;
    setCount(value);
  }

  function add(toggle) {
    let addSubToggle = 0;
    if (toggle === true) {
      addSubToggle++;
    } else if (toggle === false && props.data.amount > 1) {
      addSubToggle--;
    }

    const newOrderIndex = cart.findIndex((element) => {
      if (element.id === props.data.id) {
        return true;
      }
      return false;
    });

    const newOrder = {
      id: props.data.id,
      title: props.data.title,
      price: props.data.price,
      image: props.data.image,
      amount: count + addSubToggle,
    };

    setCount(newOrder.amount);

    const correctOrder = cart.map((element, index) => {
      if (index === newOrderIndex) {
        return newOrder;
      } else {
        return element;
      }
    });
    setCart(correctOrder);
  }

  return (
    <Flex
      mb={6}
      flexDir={screenLarge ? "row" : "column"}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image w="auto" h="150px" p="1em" src={props.data.image} alt="" />
      <Container
        w={screenLarge ? "20em" : "16em"}
        mb={screenLarge ? "0" : "0.5em"}
        align={screenLarge ? "start" : "center"}
        color="blue.500"
        _hover={{ color: "blue.700" }}
      >
        <Link to={`/produkter/${props.data.id}`}>{props.data.title}</Link>
      </Container>
      <Flex flexDir="column">
        <Text mr="1em" align="right">
          {props.data.price} €
        </Text>
        <Box align="right" mb={screenLarge ? "0" : "0.5em"}>
          <Button
            colorScheme="yellow"
            size="xs"
            onClick={() => {
              add(false);
            }}
          >
            -
          </Button>
          <Input
            w="3.5em"
            h="24px"
            type="number"
            min="1"
            max="99"
            readOnly
            value={count}
            onChange={handleChange}
          ></Input>
          <Button
            colorScheme="yellow"
            size="xs"
            onClick={() => {
              add(true);
            }}
          >
            +
          </Button>
          <Button colorScheme="yellow" size="xs" onClick={handleClick}>
            Ta bort produkt
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default CartList;
