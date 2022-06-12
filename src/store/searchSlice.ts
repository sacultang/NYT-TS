import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface SearchState {
  id: string;
  text: string;
}

const initialState: SearchState = {
  id: '',
  text: '',
};
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addNews: (state: SearchState, action: PayloadAction<SearchState>) => {
      console.log(state, action.payload);
    },
  },
});
export const { addNews } = searchSlice.actions;
export default searchSlice.reducer;
