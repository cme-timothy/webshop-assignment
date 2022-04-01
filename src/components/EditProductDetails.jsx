import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditProductDetails() {
  const [product, setProduct] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [productUpdate, setProductUpdate] = useState([]);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `https://k4backend.osuka.dev/products/${params.produktId}`
      );
      setProduct(response.data);
    }
    getProduct();
    return () => console.log("cleanup");
  }, [params.redigeraproduktId]);

  if (product.length === 0) return <h3>Loading...</h3>;

  async function submit() {
    const updatedProduct = await axios.put(
      `https://k4backend.osuka.dev/products/${params.produktId}`,
      {
        title: title,
        description: description,
        price: price,
      }
    );
    setProductUpdate(updatedProduct.data);
    setUpdated(true);
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

  return (
    <div>
      <h2>Redigera produkt information</h2>
      <img src={product.image} alt="" />
      {updated === false && productUpdate.title === undefined && (
        <h2>{product.title}</h2>
      )}
      {updated === true && productUpdate.title === "" && (
        <h2>{product.title}</h2>
      )}
      {updated === true && productUpdate.title !== "" && (
        <h2>{productUpdate.title}</h2>
      )}
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        onKeyDown={handleKeyDown}
      />
      {updated === false && productUpdate.description === undefined && (
        <p>{product.description}</p>
      )}
      {updated === true && productUpdate.description === "" && (
        <p>{product.description}</p>
      )}
      {updated === true && productUpdate.description !== "" && (
        <p>{productUpdate.description}</p>
      )}
      <input
        type="text"
        value={description}
        onChange={handleDescription}
        onKeyDown={handleKeyDown}
      />
      {updated === false && productUpdate.price === undefined && (
        <p>{product.price} €</p>
      )}
      {updated === true && productUpdate.price === "" && (
        <p>{product.price} €</p>
      )}
      {updated === true && productUpdate.price !== "" && (
        <p>{productUpdate.price} €</p>
      )}
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
    </div>
  );
}

export default EditProductDetails;
