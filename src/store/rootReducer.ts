import { combineReducers } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';

const reducer = combineReducers({
  searchSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
