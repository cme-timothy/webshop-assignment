import { atom } from "recoil";

const userCart = JSON.parse(localStorage.getItem("userSave")) || [];
export const productsInCart = atom({
  key: "productsInCart",
  default: userCart,
});
