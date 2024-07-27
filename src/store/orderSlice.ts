import {ReadOrder} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {completeOrder, fetchOrders} from './orderThunk';


export interface OrderState {
  orders: ReadOrder[];
  ordersLoading: boolean;
  completeLoading: string | false;
}

const initialState: OrderState = {
  orders: [],
  ordersLoading: false,
  completeLoading: false
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.ordersLoading = true;
    })
      .addCase(fetchOrders.fulfilled, (state, {payload: items}) => {
        state.ordersLoading = false;
        state.orders = items;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.ordersLoading = false;
      })
      .addCase(completeOrder.pending, (state, {meta: {arg: orderId}}) => {
        state.completeLoading = orderId;
      })
      .addCase(completeOrder.fulfilled, (state) => {
        state.completeLoading = false;

      })
      .addCase(completeOrder.rejected, (state) => {
        state.completeLoading = false;
      });

  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersLoading: (state) => state.ordersLoading,
    selectCompleteLoading: (state) => state.completeLoading,
  }
});

export const orderReducer = orderSlice.reducer;
export const {selectOrders, selectOrdersLoading, selectCompleteLoading} = orderSlice.selectors;