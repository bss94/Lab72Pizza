import {Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteLoading, selectDishes, selectFetchAllLoading} from '../../store/dishesSlice';
import DishItem from './DishItem';
import SpinnerBtn from '../SpinnerBtn/SpinnerBtn';
import {deleteDish, fetchDishes} from '../../store/dishesThunk';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleting = useAppSelector(selectDeleteLoading);
  const loadDishes = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    try {
      await dispatch(deleteDish(id));
      toast.success('Dish deleted successfully.');
    } catch (e) {
      toast.error(`Deleting failed ${e}`);
    } finally {
      await dispatch(fetchDishes());
    }
  };

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
            >
              <div className="w-50 d-flex align-items-center justify-content-end flex-wrap">
                <NavLink to={`/admin/dishes/${el.id}/edit`}>
                  <Button className="btn-success my-1">edit</Button>
                </NavLink>
                <SpinnerBtn className="ms-1 my-1"
                            isSending={el.id === deleting}
                            variant={'danger'}
                            onClick={() => {
                              void removeDish(el.id);
                            }}
                >
                  Delete
                </SpinnerBtn>
              </div>
            </DishItem>;
          })

      }

    </>
  );
};

export default Dishes;