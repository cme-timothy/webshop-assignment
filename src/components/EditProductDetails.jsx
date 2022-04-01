import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../recoil/auth/atom";
import { useRecoilValue } from "recoil";

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
    <div>
      <h2>Redigera produkt information</h2>
      <img src={product.image} alt="" />
      <h2>{product.title}</h2>
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        onKeyDown={handleKeyDown}
      />
      <p>{product.description}</p>
      <input
        type="text"
        value={description}
        onChange={handleDescription}
        onKeyDown={handleKeyDown}
      />
      <p>{product.price} €</p>
      <input
        type="number"
        min="0"
        value={price}
        onChange={handlePrice}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={submit}>
        Uppdatera
      </button>
      {noUpdate === true && <h3>Inga förändringar har gjorts</h3>}
    </div>
  );
}

export default EditProductDetails;
