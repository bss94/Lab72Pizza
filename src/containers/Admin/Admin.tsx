import {NavLink, Outlet} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchDishes} from '../../store/dishesThunk';


const Admin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <div className="my-4">
        <NavLink to={'/admin/dishes/add-dish'} className="mx-2 btn btn-outline-secondary">Add Dish</NavLink>
        <NavLink to={'dishes'} className="mx-2 btn btn-outline-secondary">Dishes</NavLink>
        <NavLink to={'orders'} className="mx-2 btn btn-outline-secondary">Orders</NavLink>
      </div>

      <Outlet/>
    </>
  );
};

export default Admin;