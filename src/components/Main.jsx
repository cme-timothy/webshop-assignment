import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductInfo from "./ProductInfo";
import Cart from "../pages/Cart";
import LogIn from "../pages/LogIn";
import CreateAccount from "../pages/CreateAccount"
import AdminProfile from "../pages/AdminProfile"
import MyProfile from "../pages/MyProfile"

function Main() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/produkter" element={<ProductList />} />
        <Route path="/produkter/:productId" element={<ProductInfo />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/skapakonto" element={<CreateAccount />} />
        <Route path="/adminprofil" element={<AdminProfile />} />
        <Route path="/minprofil" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default Main;
