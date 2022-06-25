import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { HistoryType } from "../model";
import { News } from "../model";
export interface AddHistory {
  history: HistoryType[];
  news: News[];
}
const initialState: AddHistory = {
  history: [],
  news: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addHistory: (state: AddHistory, action: PayloadAction<HistoryType>) => {
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    },
    addClip: (state: AddHistory, action: PayloadAction<News>) => {
      console.log(current(state.news));
      return {
        ...state,
        news: [action.payload, ...state.news],
      };
    },
  },
});
export const { addHistory, addClip } = searchSlice.actions;
export default searchSlice.reducer;
