import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryType } from "../model";
import { News } from "../model";
export interface AddHistory {
  history: HistoryType[];
  clip: News[];
}
const initialState: AddHistory = {
  history: [],
  clip: [],
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
      return {
        ...state,
        clip: [action.payload, ...state.clip],
      };
    },
  },
});
export const { addHistory, addClip } = searchSlice.actions;
export default searchSlice.reducer;
