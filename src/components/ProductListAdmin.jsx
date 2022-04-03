import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { products } from "../recoil/products/atom";
import { Button, Flex, Heading, Container, Box } from "@chakra-ui/react";

function ProductListAdmin() {
  const [productsList, setProductsList] = useRecoilState(products);
  const [showProducts, setShowProducts] = useState(false);

  async function deleteOnClick(id) {
    const response = await axios.delete(
      `https://k4backend.osuka.dev/products/${id}`
    );
    const filteredList = [...productsList].filter(
      (product) => product.id !== response.data.id
    );
    setProductsList(filteredList);
  }

  return (
    <Flex flexDir="column">
      {showProducts ? (
        <Box>
          <Heading
            w="100%"
            h="88px"
            alignSelf="start"
            borderWidth={1}
            borderBottomWidth={0}
            cursor="pointer"
            fontSize="xl"
            p="1.5em"
            color="white"
            bg="blue.500"
            onClick={() => setShowProducts(!showProducts)}
          >
            Göm listan med produkter
          </Heading>
        </Box>
      ) : (
        <Heading
          w="100%"
          h="88px"
          alignSelf="start"
          borderWidth={1}
          borderBottomWidth={0}
          cursor="pointer"
          fontSize="xl"
          p="1.5em"
          _hover={{ color: "white", bg: "blue.500" }}
          onClick={() => setShowProducts(!showProducts)}
        >
          Visa en lista med produkter
        </Heading>
      )}
      {showProducts === true &&
        productsList.map((data) => {
          return (
            <Flex
              borderWidth={1}
              borderBottomWidth={0}
              alignItems="center"
              justifyContent="space-between"
              key={data.id + nanoid()}
            >
              <Container m={0} p="2em" _hover={{ color: "blue.500" }}>
                <Link
                  key={data.id + nanoid()}
                  to={`/adminpanelen/produkter/${data.id}`}
                >
                  {data.title}
                </Link>
              </Container>
              <Button
                _hover={{ bg: "yellow.400" }}
                p="1em"
                m="0.5em 1em 0.5em 0"
                bg="yellow.300"
                _focus={{ boxShadow: "none" }}
                variant="unstyled"
                size="xl"
                onClick={() => deleteOnClick(data.id)}
                key={data.id + nanoid()}
              >
                Ta bort produkt
              </Button>
            </Flex>
          );
        })}
    </Flex>
  );
}

export default ProductListAdmin;
