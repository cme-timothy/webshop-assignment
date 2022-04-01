import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductInfo from "./ProductInfo";
import Cart from "../pages/Cart";
import LogIn from "../pages/LogIn";
import CreateAccount from "../pages/CreateAccount"
import AdminProfile from "../pages/AdminProfile"
import MyProfile from "../pages/MyProfile"
import { useEffect } from "react";
import { products } from "../recoil/products/atom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import EditProductDetails from "./EditProductDetails";

function Main() {
  const setProductsList = useSetRecoilState(products);
  
  useEffect(() => {
    async function allProducts() {
      const response = await axios.get("https://k4backend.osuka.dev/products");
      setProductsList(response.data);
    }
    allProducts();
    return () => console.log("cleanup");
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/produkter" element={<ProductList />} />
        <Route path="/produkter/:produktId" element={<ProductInfo />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/skapakonto" element={<CreateAccount />} />
        <Route path="/adminprofil" element={<AdminProfile />} />
        <Route path="/adminprofil/produkter/:produktId" element={<EditProductDetails />} />
        <Route path="/minprofil" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default Main;
