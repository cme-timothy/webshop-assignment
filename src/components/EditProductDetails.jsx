import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../recoil/auth/atom";
import { useRecoilValue } from "recoil";
import { Button } from "@chakra-ui/react";
import { Box, Text, Image, Heading, Input } from "@chakra-ui/react";

function EditProductDetails() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const token = useRecoilValue(auth);
  const [noUpdate, setNoUpdate] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `https://k4backend.osuka.dev/products/${params.produktId}`
      );
      setProduct(response.data);
    }
    getProduct();
  }, []);

  if (product.length === 0) return <h3>Loading...</h3>;

  async function submit() {
    setNoUpdate(false);
    const sameTest = product;
    const updatedProduct = await axios.put(
      `https://k4backend.osuka.dev/products/${params.produktId}`,
      {
        ...(title !== "" && { title: title }),
        ...(title === "" && { title: product.title }),
        ...(price !== "" && { price: price }),
        ...(price === "" && { price: product.price }),
        ...(description !== "" && { description: description }),
        ...(description === "" && { description: product.description }),
        image: product.image,
        category: product.category,
      }
    );
    if (
      sameTest.title === updatedProduct.data.title &&
      sameTest.price === updatedProduct.data.price &&
      sameTest.description === updatedProduct.data.description
    ) {
      setNoUpdate(true);
    }
    setProduct(updatedProduct.data);
    setTitle("");
    setDescription("");
    setPrice("");
  }

  function handleTitle(event) {
    const value = event.target.value;
    setTitle(value);
  }

  function handleDescription(event) {
    const value = event.target.value;
    setDescription(value);
  }

  function handlePrice(event) {
    const value = event.target.value;
    setPrice(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  if (token.length === 0)
    return <h3>Du har inte tillgång till den här sidan</h3>;

  return (
    <Box maxW="500px" h="270px" mr="auto" ml="auto">
      <Heading mt={4} mb={12} align="center">
        Redigera produkt information
      </Heading>
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
        <Heading mb="0.5em">{product.title}</Heading>
        <Heading fontSize="lg" mb="0.5em">
          Produkt namn
        </Heading>
        <Input
          placeholder="Ändra titeln här!"
          type="text"
          value={title}
          onChange={handleTitle}
          onKeyDown={handleKeyDown}
        />
        <Text mt="1em" mb="1em">
          {product.description}
        </Text>
        <Heading fontSize="lg" mb="0.5em">
          Produkt beskrivning
        </Heading>
        <Input
          placeholder="Ändra beskrivningen här!"
          type="text"
          value={description}
          onChange={handleDescription}
          onKeyDown={handleKeyDown}
        />
        <Heading mt="1em" mb="0.5em" size="lg" align="center">
          {product.price} €
        </Heading>
        <Heading fontSize="lg" mb="0.5em">
          Produkt priset
        </Heading>
        <Input
          placeholder="Ändra priset här!"
          type="number"
          min="0"
          value={price}
          onChange={handlePrice}
          onKeyDown={handleKeyDown}
        />
      </Box>
      <Button
        w="100%"
        colorScheme="yellow"
        mt={4}
        mb="2em"
        type="submit"
        onClick={submit}
      >
        Uppdatera
      </Button>
      {noUpdate === true && (
        <Heading mt="-1.5em" pb="1em" align="center" size="s" color="red">
          Inga förändringar har gjorts
        </Heading>
      )}
    </Box>
  );
}

export default EditProductDetails;
