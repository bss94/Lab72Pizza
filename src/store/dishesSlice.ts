import {ApiDish, Dish} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunk';


export interface DishesState {
  items: Dish[];
  fetchAllLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  fetchOneLoading: boolean;
  item: null | ApiDish;
  updateLoading: boolean;
}

const initialState: DishesState = {
  items: [],
  fetchAllLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  item: null,
  updateLoading: false,
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchAllLoading = true;
    })
      .addCase(fetchDishes.fulfilled, (state, {payload: items}) => {
        state.fetchAllLoading = false;
        state.items = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchAllLoading = false;
      })
      .addCase(createDish.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.createLoading = false;

      })
      .addCase(createDish.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(deleteDish.pending, (state, {meta: {arg: dishId}}) => {
        state.deleteLoading = dishId;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;

      })
      .addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(fetchOneDish.pending, (state) => {
        state.fetchOneLoading = true;
        state.item = null;
      })
      .addCase(fetchOneDish.fulfilled, (state, {payload: item}) => {
        state.fetchOneLoading = false;
        state.item = item;
      })
      .addCase(fetchOneDish.rejected, (state) => {
        state.fetchOneLoading = false;
      })
      .addCase(updateDish.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateDish.fulfilled, (state) => {
        state.updateLoading = false;
        state.item = null;

      })
      .addCase(updateDish.rejected, (state) => {
        state.updateLoading = false;
      });

  },
  selectors: {
    selectDishes: (state) => state.items,
    selectFetchAllLoading: (state) => state.fetchAllLoading,
    selectCreateLoading: (state) => state.createLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
    selectFetchOneLoading: (state) => state.fetchOneLoading,
    selectOneDish: (state) => state.item,
    selectUpdateLoading: (state) => state.updateLoading,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectDishes,
  selectOneDish,
  selectFetchAllLoading,
  selectCreateLoading,
  selectDeleteLoading,
  selectUpdateLoading,
  selectFetchOneLoading
} = dishesSlice.selectors;
