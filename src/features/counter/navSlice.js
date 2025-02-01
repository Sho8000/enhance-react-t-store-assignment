import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavVisible:false,
}

export const visibleSlice = createSlice({
  name: 'navVisible',
  initialState,
  reducers:{
    changeStatus: (state,action) => {
      state.isNavVisible = action.payload;
    },
  }
})

export const {changeStatus } = visibleSlice.actions;

//for ts:
export const selectVisible = (state) => state.navVisible.isNavVisible;
export default visibleSlice.reducer