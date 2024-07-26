import {useAppSelector} from '../../app/hooks';
import {selectCartDishes} from '../../store/cartSlice';
import {Button} from 'react-bootstrap';
import CartDishes from './CartDishes';

const Cart = () => {
  const cartDishes = useAppSelector(selectCartDishes);


  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  },150);
  return (
    <>
      <CartDishes/>
      <p className="mt-3 mb-2 fw-bold">For delivery 150 KGS</p>
      <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
        <p className="m-0">Order total: <strong>{total}</strong></p>
        <Button className="btn btn-light btn-outline-secondary">Order</Button>
      </div>
    </>
  );
};

export default Cart;