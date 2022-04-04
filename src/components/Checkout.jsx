import { useRecoilValue } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import {
  Text,
  Flex,
  Box,
  Container,
  Button,
  Image,
  Input,
  Heading,
} from "@chakra-ui/react";

function Checkout() {
  const customerCart = useRecoilValue(productsInCart);

  const allOrders = [];
  allOrders.push(
    customerCart.map((element) => {
      return parseFloat(element.price * element.amount);
    })
  );

  const sumAllOrders = allOrders[0].reduce(
    (prevOrders, Orders) => prevOrders + Orders,
    0
  );

  const twoDecimals = +sumAllOrders.toFixed(2);

  return (
    <div>
      <Box h="3em">
        <Flex borderRadius={5} bg="gray.100" justifyContent="space-between" alignItems="center">
          <Text p="1em">Summa</Text>
          <Text mr="1em">{`${twoDecimals} €`}</Text>
        </Flex>
      </Box>
      <Heading size="l" align="center" mt="1.5em" mb="0.7em" color="green.300">
        Alltid fri frakt!
      </Heading>
      <Button mb="2em" w="100%" colorScheme="blue" type="submit">
        Till kassan
      </Button>
    </div>
  );
}

export default Checkout;
