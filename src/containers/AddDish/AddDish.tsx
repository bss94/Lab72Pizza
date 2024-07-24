
import DishForm from '../../components/ DishForm/DishForm';
import {ApiDish} from '../../types';
import {toast} from 'react-toastify';
import axiosApi from '../../axiosApi';

const AddDish = () => {
  const onSubmit = async (dish: ApiDish) => {
    try {
      await axiosApi.post('/pizza/dishes.json', dish);
      toast.success('Dish created');
    } catch (error) {
      toast.error('Could not create dish!');
    }
  };

  return (
    <div>
      <DishForm onSubmit={onSubmit} sending={false}/>
    </div>
  );
};

export default AddDish;