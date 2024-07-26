import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder, AppOrder, OrderDishes} from '../types';
import {AppDispatch} from '../app/store';
import axiosApi from '../axiosApi';



export const createOrder = createAsyncThunk<void, AppOrder, { dispatch: AppDispatch }>(
  'cart/createOrder',
  async (order: AppOrder) => {
    const orderMutation = order.dishes.reduce<OrderDishes>((acc,cardDish)=>{
      acc[cardDish.dish.id]=cardDish.amount;
      return acc;
    },{})

    const newOrder:ApiOrder = {
      customer:order.customer,
      dishes:orderMutation,
    }
    await axiosApi.post('/pizza/orders.json', newOrder);
  }
);
