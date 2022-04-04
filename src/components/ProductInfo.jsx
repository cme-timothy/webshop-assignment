import { useRecoilState } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { Box, Text, Image, Heading } from "@chakra-ui/react";

function ProductInfo() {
  const [cart, setCart] = useRecoilState(productsInCart);
  const [amount] = useState(0);
  const [product, setProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `https://k4backend.osuka.dev/products/${params.produktId}`
      );
      setProduct(response.data);
    }
    getProduct();
  }, [params.produktId]);

  if (product.length === 0) return <h3>Loading...</h3>;

  const objSerialized = JSON.stringify(cart);
  localStorage.setItem("userSave", objSerialized);

  const newOrderIndex = cart.findIndex((element) => {
    if (element.id === product.id) {
      return true;
    }
    return false;
  });

  const correctOrder = cart.map((element, index) => {
    if (index === newOrderIndex) {
      return element;
    } else {
      return { empty: true };
    }
  });

  function changeAmount() {
    if (correctOrder[newOrderIndex]?.amount) {
      return correctOrder[newOrderIndex].amount;
    } else {
      return 1;
    }
  }

  function add() {
    if (amount === 0) {
      const filteredCart = [...cart].filter(
        (thisProduct) => thisProduct.id !== product.id
      );
      setCart(() => {
        return [
          ...filteredCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            amount: changeAmount(),
          },
        ];
      });
    }
  }

  function orderdToggle() {
    if (correctOrder[newOrderIndex]?.amount) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box maxW="500px" h="270px" mr="auto" ml="auto">
      <Image
        w="300px"
        h="auto"
        p="1em"
        ml="auto"
        mr="auto"
        pb={0}
        src={product.image}
        alt="produkt"
      />
      <Box p="3" mt="1em">
        <Heading>{product.title}</Heading>
        <Text mt="1em">{product.description}</Text>
        <Heading mt="0.5em" size="lg" align="center">
          {product.price} €
        </Heading>
      </Box>

      {orderdToggle() ? (
        <Button
          mb="2em"
          w="100%"
          colorScheme="yellow"
          mt={3}
          onClick={add}
        >
          <Link to="/varukorg">Gå till varukorgen</Link>
        </Button>
      ) : (
        <Button mb="2em" w="100%" colorScheme="blue" mt={3} onClick={add}>
          Lägg i varukorgen"
        </Button>
      )}
    </Box>
  );
}

export default ProductInfo;
