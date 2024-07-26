import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {decreaseDish, increaseDish, removeDish, selectCartDishes} from '../../store/cartSlice';
import CartItem from './CartItem';
import {Dish} from '../../types';

const CartDishes = () => {
  const cartDishes = useAppSelector(selectCartDishes);
  const dispatch = useAppDispatch();
  const removeThisDish = (dish: Dish) => {
    dispatch(removeDish(dish));
  };
  const increase = (dish: Dish) => {
    dispatch(increaseDish(dish));
  };
  const decrease = (dish: Dish) => {
    dispatch(decreaseDish(dish));
  };

  return (
    <>
      {cartDishes.map((el) => {
        return <CartItem key={el.dish.id}
                         title={el.dish.title}
                         amount={el.amount}
                         price={el.dish.price}
                         remove={() => removeThisDish(el.dish)}
                         increase={() => increase(el.dish)}
                         decrease={() => decrease(el.dish)}
        />;
      })}

    </>
  );
};

export default CartDishes;