import DishForm from '../../components/ DishForm/DishForm';
import {ApiDish} from '../../types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {createDish} from '../../store/dishesThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateLoading} from '../../store/dishesSlice';

const AddDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateLoading);
  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(createDish(dish));
      navigate('/admin');
      toast.success('Dish created');
    } catch (error) {
      toast.error('Could not create dish!');
    }
  };

  return (
    <div>
      <DishForm onSubmit={onSubmit} sending={loading}/>
    </div>
  );
};

export default AddDish;