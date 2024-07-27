import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {completeOrder, fetchOrders} from '../../store/orderThunk';
import {selectCompleteLoading, selectOrders, selectOrdersLoading} from '../../store/orderSlice';
import OrderItem from '../../components/OrdersList/OrderItem';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {fetchDishes} from '../../store/dishesThunk';
import {toast} from 'react-toastify';

const Orders = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const orders = useAppSelector(selectOrders);
  const ordersLoading = useAppSelector(selectOrdersLoading);
  const completeLoading = useAppSelector(selectCompleteLoading);

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchOrders(dishes));
  }, [dishes, dispatch]);

  const completeThisOrder = async (id: string) => {
    try {
      await dispatch(completeOrder(id));
      toast.success('Order Completed Successfully.');
    } catch (e) {
      toast.error(`Order Failed: ${e}`);
    } finally {
      await dispatch(fetchOrders(dishes));
    }
  };

  return (
    <>
      {ordersLoading && <LoadingSpinner/>}
      {orders.map(el => {
        return <OrderItem key={el.id} order={el} completeOrder={completeThisOrder} completeLoading={completeLoading}/>;
      })}
    </>
  );
};

export default Orders;