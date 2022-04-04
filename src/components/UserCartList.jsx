import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { products } from "../recoil/products/atom";
import { Text, Flex, Heading, Box, Container, SimpleGrid } from "@chakra-ui/react";

function UserCartList() {
  const [showCarts, setShowCarts] = useState(false);
  const [userCarts, setUserCarts] = useState([]);
  const productsList = useRecoilValue(products);

  async function allCarts() {
    setShowCarts(!showCarts);
    const response = await axios.get("https://k4backend.osuka.dev/carts");
    setUserCarts(response.data);
  }

  return (
    <Flex flexDir="column">
      {showCarts ? (
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
            onClick={allCarts}
          >
            Göm listan med användares varukorgar
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
          onClick={allCarts}
        >
          Visa en lista med användares varukorgar
        </Heading>
      )}
      <SimpleGrid minChildWidth="300px">
        {showCarts === true &&
          userCarts.map((data) => {
            return (
              <Box
                m={0}
                borderWidth={1}
                borderTopWidth={0}
                p="1em"
                key={data.id + nanoid()}
              >
                <Text key={data.id + nanoid()}>Användar Id: {data.userId}</Text>
                <Text key={data.id + nanoid()}>
                  Datum: {data.date.slice(0, 10)}
                </Text>
                <Text key={data.id + nanoid()}>Produkter i varukorgen:</Text>

                {data.products.map((product) => {
                  return (
                    <Box key={data.id + nanoid()} ml={3} _hover={{ color: "blue.500" }}>
                      <Link
                        key={product.productId + nanoid()}
                        to={`/produkter/${product.productId}`}
                      >
                        {productsList[product.productId - 1].title}
                      </Link>
                      <Text key={product.productId + nanoid()}>
                        Kvantitet: {product.quantity}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
      </SimpleGrid>
    </Flex>
  );
}

export default UserCartList;
