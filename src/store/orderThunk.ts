import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder, ApiOrders, Dish, Order, OrderDish, ReadOrder} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchOrders = createAsyncThunk<
  ReadOrder[],
  Dish[],
  { state: RootState }>(
  'orders/fetchOrders',
  async (dishes) => {
    const orderResponse = await axiosApi.get<ApiOrders | null>('/pizza/orders.json');
    const orders = orderResponse.data;
    let newOrders: Order[] = [];
    if (orders) {
      newOrders = Object.keys(orders).map((key: string) => {
        const order: ApiOrder = orders[key];
        return {
          id: key,
          ...order
        };
      });
    }
    const readableOrders: ReadOrder[] = newOrders.map((order) => {
      const readableDishes: OrderDish[] = Object.keys(order.dishes).map((key: string) => {
        const currentDish = dishes.find(dish => dish.id === key);
        if (currentDish) {
          return {
            id: key,
            title: currentDish.title,
            price: currentDish.price,
            amount: order.dishes[key]
          };
        } else {
          return {
            id: key,
            title: 'not found',
            price: 0,
            amount: order.dishes[key]
          };
        }
      });
      return {
        ...order,
        dishes: readableDishes
      };
    });

    return readableOrders;
  }
);

export const completeOrder = createAsyncThunk<
  void,
  string,
  { state: RootState }
>(
  'orders/completeOrder',
  async (orderId: string) => {
    await axiosApi.delete(`/pizza/orders/${orderId}.json`);
  }
);