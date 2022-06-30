import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { HistoryType } from "../model";
import { News } from "../model";
export interface SliceType {
  history: HistoryType[];
  news: News[];
}
const initialState: SliceType = {
  history: [],
  news: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addHistory: (state: SliceType, action: PayloadAction<HistoryType>) => {
      const searchedHistory = current(state.history);
      let filterHistory = searchedHistory.filter((e) => {
        return e.text !== action.payload.text;
      });

      return {
        ...state,
        history: [action.payload, ...filterHistory],
      };
    },
    removeHistory: (state: SliceType, action: PayloadAction<HistoryType>) => {
      return {
        ...state,
        history: state.history.filter(
          (history) => history.id !== action.payload.id
        ),
      };
    },
    addClip: (state: SliceType, action: PayloadAction<News>) => {
      return {
        ...state,
        news: [action.payload, ...state.news],
      };
    },
    removeClip: (state: SliceType, action: PayloadAction<News>) => {
      return {
        ...state,
        news: state.news.filter(
          (clipNews) => clipNews._id !== action.payload._id
        ),
      };
    },
  },
});
export const { addHistory, addClip, removeHistory, removeClip } =
  searchSlice.actions;
export default searchSlice.reducer;
