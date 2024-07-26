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
    const dishes = response.data;
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

export const createDish = createAsyncThunk<void, ApiDish, { dispatch: AppDispatch }>(
  'dishes/createDish',
  async (dish: ApiDish) => {
    await axiosApi.post('/pizza/dishes.json', dish);
  }
);

export const deleteDish = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>(
  'dishes/deleteDish',
  async (dishId: string) => {
    await axiosApi.delete(`/pizza/dishes/${dishId}.json`);
  }
);

export const fetchOneDish = createAsyncThunk<
  ApiDish,
  string,
  { dispatch: AppDispatch }
>(
  'dishes/fetchOneDish',
  async (id) => {
    const response = await axiosApi.get<ApiDish | null>(
      `/pizza/dishes/${id}.json`,
    );
    const dish = response.data;
    if (dish === null) {
      throw new Error('Not Found');
    }
    return dish;
  }
);

export interface UpdateArgs {
  id: string;
  apiDish: ApiDish;
}

export const updateDish = createAsyncThunk<
  void,
  UpdateArgs,
  { dispatch: AppDispatch }
>(
  'dishes/updateDish',
  async ({id, apiDish}) => {
    await axiosApi.put(`/pizza/dishes/${id}.json`, apiDish);
  }
);