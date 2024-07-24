import {Dish} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchDishes} from './dishesThunk';


export interface DishesState{
  items:Dish[];
  fetchAllLoading:boolean;
  createLoading:boolean;
  deleteLoading:boolean;
  fetchOneLoading:boolean;
  item:null|Dish;
  updateLoading:boolean;
}

const initialState: DishesState = {
  items:[],
  fetchAllLoading:false,
  createLoading:false,
  deleteLoading:false,
  fetchOneLoading:false,
  item:null,
  updateLoading:false,
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchDishes.pending,(state)=>{
      state.fetchAllLoading=true;
    })
      .addCase(fetchDishes.fulfilled,(state,{payload:items})=>{
        state.fetchAllLoading=false;
        state.items=items
      })
      .addCase(fetchDishes.rejected,(state)=>{
        state.fetchAllLoading=false;
      })

  },
  selectors:{
    selectDishes:(state)=>state.items,
    selectFetchAllLoading:(state)=>state.fetchAllLoading,
    selectCreateLoading:(state)=>state.createLoading,
    selectDeleteLoading:(state)=>state.deleteLoading,
    selectFetchOneLoading:(state)=>state.fetchOneLoading,
    selectOneDish:(state)=>state.item,
    selectUpdateLoading:(state)=>state.updateLoading,
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
} = dishesSlice.selectors
