import {CartDish, Dish} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface CartState{
  cartDishes:CartDish[];
  showModal:boolean;
}
const initialState: CartState = {
  cartDishes:[],
  showModal:false,
}

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addDish: (state, { payload: dish }: PayloadAction<Dish>) => {
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
    increaseDish:(state, { payload: dish }: PayloadAction<Dish>)=>{
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
        state.cartDishes[index].amount++;
    },
    decreaseDish:(state, { payload: dish }: PayloadAction<Dish>)=>{
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      if (state.cartDishes[index].amount > 1) {
        state.cartDishes[index].amount--;
      } else {
        state.cartDishes.splice(index, 1);
      }
    },
    removeDish: (state, { payload: dish }: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      if (index !== -1) {
        state.cartDishes.splice(index, 1);
      }
    },



    clearCart: (state) => {
      state.cartDishes = [];
    },
  },
  selectors:{
    selectCartDishes:(state)=>state.cartDishes
  },
})
export const cartReducer = cartSlice.reducer

export const {addDish,
  removeDish,
  increaseDish,
  decreaseDish,
  clearCart} = cartSlice.actions;
export const {selectCartDishes} = cartSlice.selectors;