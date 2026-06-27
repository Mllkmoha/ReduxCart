import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart: (state, action) => {
     state.totalQuantity = action.payload.totalQuantity || 0;
     state.items = action.payload.items || [];

    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id,
      );
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: item.id,
          quantity: 1,
          price: item.price,
          total: item.price,
          name: item.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + item.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
