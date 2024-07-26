import {useAppDispatch} from '../../app/hooks';
//import {selectDishes} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {fetchDishes} from '../../store/dishesThunk';
import {NavLink, Outlet} from 'react-router-dom';


const Admin = () => {
  const dispatch = useAppDispatch();
 // const dishes = useAppSelector(selectDishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  return (
    <>
      {/*asdad*/}
     <NavLink to={'dishes'} className='nav-link btn btn-danger btn-secondary'>Dishes</NavLink>
      {/*asdad*/}
      <Outlet/>
    </>
  );
};

export default Admin;