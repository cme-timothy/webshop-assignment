import { atom } from "recoil";

const userCart = JSON.parse(localStorage.getItem("userSave")) || [];
function atStart() {
  if (userCart !== null) {
    return userCart;
  } else {
    return userCart;
  }
}

export const productsInCart = atom({
  key: "productsInCart",
  default: atStart(),
});
