import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import ProductLink from "../components/ProductLink";
import { products } from "../recoil/products/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { SimpleGrid, Heading } from "@chakra-ui/react";

function ProductList() {
  const [productsList, setProductsList] = useRecoilState(products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const responseCategories = await axios.get(
        "https://k4backend.osuka.dev/products/categories"
      );
      setCategories(responseCategories.data);
    }
    getCategories();
  }, [setCategories]);

  async function filterAllProducts() {
    const response = await axios.get("https://k4backend.osuka.dev/products");
    setProductsList(response.data);
  }

  async function filterCategories(category) {
    const responseCategories = await axios.get(
      `https://k4backend.osuka.dev/products/category/${category}`
    );
    setProductsList(responseCategories.data);
  }

  if (productsList.length === 0 || categories.length === 0)
    return <h3>Loading...</h3>;

  return (
    <div>
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <Heading mt={4} mb={12}>
        Våra klipp
      </Heading>
      <Heading size="l" mt={4}>
        Filter:
      </Heading>
      {categories.map((data) => {
        return (
          <Button
            _focus={{ boxShadow: "none", bg: "yellow.500" }}
            borderRadius={0}
            colorScheme="yellow"
            size="xs"
            key={data}
            onClick={() => filterCategories(data)}
          >
            {data}
          </Button>
        );
      })}
      <Button
        borderRadius={0}
        colorScheme="yellow"
        size="xs"
        onClick={filterAllProducts}
      >
        all
      </Button>
      <SimpleGrid mt="2em" mb="2em" align="center" minChildWidth="400px" spacing={1}>
        {productsList.map((data) => {
          return <ProductLink key={data.id} data={data} />;
        })}
      </SimpleGrid>
    </div>
  );
}

export default ProductList;
