import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish} from '../types';
import {AppDispatch} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchDishes = createAsyncThunk<
  Dish[],
  undefined,
  { dispatch: AppDispatch }
>(
  'dishes/fetchDishes',
  async () => {
    const response = await axiosApi.get<ApiDishes | null>('/pizza/dishes.json');
    const dishes = response.data
    let newDishes: Dish[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map((key: string) => {
        const dish: ApiDish = dishes[key];
        return {
          id: key,
          ...dish
        };
      });
    }
    return newDishes;
  }
);