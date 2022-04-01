import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import ProductLink from "../components/ProductLink";
import { products } from "../recoil/products/atom";
import { useRecoilState } from "recoil";
import axios from "axios";

function ProductList() {
  const [productsList, setProductsList] = useRecoilState(products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const responseCategories = await axios.get("https://k4backend.osuka.dev/products/categories");
      setCategories(responseCategories.data);
    }
    getCategories();
  }, [setCategories]);

  async function filterAllProducts() {
    const response = await axios.get("https://k4backend.osuka.dev/products");
    setProductsList(response.data);
  }

  async function filterCategories(category) {
    const responseCategories = await axios.get(`https://k4backend.osuka.dev/products/category/${category}`);
    setProductsList(responseCategories.data);
  }

  if (productsList.length === 0 || categories.length === 0) return <h3>Loading...</h3>;

  return (
    <div>
      <Helmet>
        <title>Alla produkter - Tung Store</title>
      </Helmet>
      <h3>Våra klipp</h3>
      {categories.map((data) => {
        return <button key={data} onClick={() => filterCategories(data)}>{data}</button>;
      })}
      <button onClick={filterAllProducts}>all</button>
      {productsList.map((data) => {
        return <ProductLink key={data.id} data={data} />;
      })}
    </div>
  );
}

export default ProductList;
