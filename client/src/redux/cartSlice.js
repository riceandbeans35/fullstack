import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const itemToUpdate = state.find(
        (item) => item.inventory_id === action.payload.inventory_id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove(state, action) {
      const itemToUpdate = state.find(
        (item) => item.inventory_id === action.payload.inventory_id
      );
      if (itemToUpdate) {
        if (itemToUpdate.quantity > 1) {
          itemToUpdate.quantity -= 1;
        } else {
          return state.filter(
            (item) => item.inventory_id !== action.payload.inventory_id
          );
        }
      }
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
