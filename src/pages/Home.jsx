import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Image, Heading, Flex, Box, keyframes } from "@chakra-ui/react";
import homeImage from "../assets/adrian-sulyok-sczNLg6rrhQ-unsplash.jpg";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";

const move = keyframes`
  0% {
    transform: translate(0);    
  }
  50% {
    transform: translate(20px);
  100% {
    ransform: translate(0px);
`;

function Home() {
  const animation = `${move} 1s linear`;
  const [screenM] = useMediaQuery("(min-width: 700px)");
  const [screenL] = useMediaQuery("(min-width: 1240px)");

  return (
    <div>
      <Helmet>
        <title>Den bästa affären för allt - Tung Store</title>
      </Helmet>
      <Heading align="center" mt={4}></Heading>
      <Flex
        ml={screenL ? "0" : "-1.5em"}
        mr={screenL ? "0" : "-1.5em"}
        flexDir={screenL ? "rows" : "column"}
        justifyContent="center"
        gap={4}
      >
        <Box display={screenM ? "static" : "none"} pos="relative" align="center">
          <Image
            w={screenL ? "800px" : "auto"}
            h="800px"
            src={homeImage}
            objectFit="cover"
            alt="lagershop"
          ></Image>
          <Heading
            pos="absolute"
            borderRadius={20}
            p="1em"
            pl="3.5em"
            pr="3.5em"
            bg="blue.500"
            color="yellow.300"
            left="120px"
            right="120px"
            top="330px"
          >
            Några önskemål? Vi beställer
          </Heading>
        </Box>
        <Box
          bg="yellow.300"
          w={screenL ? "400px" : "auto"}
          h={screenL ? "800px" : "180px"}
        >
          <Box
            fontSize="4xl"
            p="0.5em"
            pl="1em"
            pr="0.5em"
            fontWeight="bold"
            align="left"
            mt={screenL ? "340px" : "15px"}
          >
            <Link to="/produkter">
              Shoppa loss <ArrowForwardIcon _hover={{ animation }} />
            </Link>
          </Box>
          <Box
            borderTopWidth={1}
            align="left"
            p="1em"
            pl="2.2em"
            mt={screenL ? "310px" : "15px"}
            borderColor="black"
          >
            <Link to="/">Tung Store: International</Link>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Home;
