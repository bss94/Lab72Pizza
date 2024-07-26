import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import DishForm from '../../components/ DishForm/DishForm';
import {ApiDish} from '../../types';
import {fetchOneDish, updateDish} from '../../store/dishesThunk';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {selectFetchOneLoading, selectOneDish, selectUpdateLoading} from '../../store/dishesSlice';
import {Spinner} from 'react-bootstrap';


const EditDish = () => {
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchOneLoading);
  const updating = useAppSelector(selectUpdateLoading);
  const dish = useAppSelector(selectOneDish);

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (apiDish: ApiDish) => {
    try {
      await dispatch(updateDish({id, apiDish})).unwrap();
      toast.success('Dish updated');
      navigate('/admin');
    } catch (error) {
      toast.error('Could not update dish!');
    }
  };

  return (
    <>
      {
        loading && (
          <div
            className="d-flex align-items-center justify-content-center
          bg-opacity-25 bg-black h-100 w-100 position-absolute">
            <Spinner/></div>
        )}
      {
        !loading && dish && (
          <DishForm onSubmit={onSubmit} sending={updating} existingDish={dish}/>
        )
      }

    </>
  );
};

export default EditDish;