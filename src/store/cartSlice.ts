import {CartDish, Dish} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createOrder} from './cartThunk';


export interface CartState {
  cartDishes: CartDish[];
  showModal: boolean;
  creatingOrder: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  showModal: false,
  creatingOrder: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    increaseDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      state.cartDishes[index].amount++;
    },
    decreaseDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      if (state.cartDishes[index].amount > 1) {
        state.cartDishes[index].amount--;
      } else {
        state.cartDishes.splice(index, 1);
      }
    },
    removeDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      state.cartDishes.splice(index, 1);
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.creatingOrder = true;
    })
      .addCase(createOrder.fulfilled, (state) => {
        state.creatingOrder = false;

      })
      .addCase(createOrder.rejected, (state) => {
        state.creatingOrder = false;
      });
  },
  selectors: {
    selectCartDishes: (state) => state.cartDishes,
    selectModalShow: (state) => state.showModal,
    selectCreatingOrder: (state) => state.creatingOrder,
  },
});
export const cartReducer = cartSlice.reducer;

export const {
  addDish,
  removeDish,
  increaseDish,
  decreaseDish,
  clearCart,
  openModal,
  closeModal
} = cartSlice.actions;
export const {
  selectCartDishes,
  selectModalShow,
  selectCreatingOrder
} = cartSlice.selectors;