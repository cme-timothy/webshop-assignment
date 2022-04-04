import { Link } from "react-router-dom";
import { Box, Container, Text, Image } from "@chakra-ui/react";

function ProductLink(props) {
  return (
    <Box w="350px" h="270px" mr="auto" ml="auto">
      <Link key={props.data.id} to={`/produkter/${props.data.id}`}>
        <Image
          w="auto"
          h="150px"
          p="1em"
          pb={0}
          src={props.data.image}
          alt="produkter"
        />
      </Link>
      <Container
        m={0}
        p="0.5em"
        color="blue.500"
        _hover={{ color: "blue.700" }}
      >
        <Link key={props.data.id} to={`/produkter/${props.data.id}`}>
          {props.data.title}
        </Link>
      </Container>
      <Text>{props.data.price} €</Text>
    </Box>
  );
}

export default ProductLink;
