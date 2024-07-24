import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {fetchDishes} from '../../store/dishesThunk';
import AddDish from '../AddDish/AddDish';


const Admin = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  return (
    <div>
      <AddDish/>
      {dishes.map(el=>{
        return <div key={el.id}>
          <h5>{el.title}</h5>
          <p>{el.price}</p>
        </div>
      })}
    </div>
  );
};

export default Admin;