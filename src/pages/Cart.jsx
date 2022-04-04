import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import CartList from "../components/CartList";
import Checkout from "../components/Checkout";
import { Flex, Heading, Container } from "@chakra-ui/react";

function Cart() {
  const customerCart = useRecoilValue(productsInCart);

  function checkoutOn() {
    if (customerCart.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container borderWidth={1} borderTopWidth={0} boxShadow="md" maxW="50em">
      <Helmet>
        <title>Din varukorg - Tung Store</title>
      </Helmet>
      <Heading borderWidth={1} boxShadow="md" mr="-1.1em" ml="-1.1em" bg="yellow.400" align="center" p={0} pb="0.5em" pt="0.5em" mb={6}>
        Varukorg
      </Heading>
      <Flex flexDir="column" alignItems="center">
        {customerCart.map((data) => {
          return <CartList key={data.id} data={data} />;
        })}
      </Flex>
      {checkoutOn() ? <Checkout /> : <p>Det finns inget i varukorgen</p>}
    </Container>
  );
}

export default Cart;
