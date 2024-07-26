import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes, selectFetchAllLoading} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {fetchDishes} from '../../store/dishesThunk';
import DishItem from '../Dishes/DishItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {addDish, selectCartDishes} from '../../store/cartSlice';
import {Dish} from '../../types';
import {NavLink} from 'react-router-dom';


const ClientDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const loadDishes = useAppSelector(selectFetchAllLoading);
  const cartDishes = useAppSelector(selectCartDishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

const addToCart=(dish:Dish)=>{
  dispatch(addDish(dish));
  console.log(cartDishes);
}

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);
  return (
    <>
      {
        loadDishes ?
          <LoadingSpinner/>
          :
          dishes.map(el => {
            return <DishItem
              title={el.title}
              image={el.image}
              price={el.price}
              key={el.id}
              addToCart={()=>addToCart(el)}
            />;

          })

      }
      <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
        <p className="m-0">Order total: <strong>{total}</strong></p>
       <NavLink to={'/cart'} className="btn btn-light btn-outline-secondary">Order</NavLink>
      </div>

    </>
  );
};

export default ClientDishes;