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
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/skapaKonto" element={<CreateAccount />} />
        <Route path="/adminProfil" element={<AdminProfile />} />
        <Route path="/minProfil/:userId" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default Main;
