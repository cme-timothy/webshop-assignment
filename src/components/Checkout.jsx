import { useRecoilValue } from "recoil";
import { productsInCart } from "../recoil/cart/atom";
import { Button } from '@chakra-ui/react'

function Checkout() {
  const customerCart = useRecoilValue(productsInCart);

  const allOrders = [];
  allOrders.push(
    customerCart.map((element) => {
      return parseFloat(element.price * element.amount);
    })
  );

  const sumAllOrders = allOrders[0].reduce(
    (prevOrders, Orders) => prevOrders + Orders,
    0
  );

  const twoDecimals = +sumAllOrders.toFixed(2);

  return (
    <div>
      <h2>Frakt</h2>
      <h2>0 €</h2>
      <h2>Summa</h2>
      <h2>{`${twoDecimals} €`}</h2>
      <Button colorScheme='yellow' size='xs'>Till kassan</Button>
    </div>
  );
}

export default Checkout;
