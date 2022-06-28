import { Box } from "@mui/material";
import { HistoryType } from "../model";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { removeHistory } from "../store/searchSlice";
interface Props {
  inputFocus: boolean;
}

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.searchSlice.history);
  const remove = (key: HistoryType) => {
    dispatch(removeHistory(key));
  };
  return (
    <>
      {
        <Box
          style={{
            left: 0,
            right: 0,
            margin: "auto",
            zIndex: 1,
            position: "absolute",
            backgroundColor: "#ffffff45",
            padding: "20px",
            boxSizing: "border-box",
            maxWidth: "700px",
            minWidth: "400px",
            border: "1px solid #ccc",
          }}
        >
          {history.slice(0, 5).map((key: HistoryType) => {
            return (
              <div key={key.id}>
                {key.text} <button onClick={() => remove(key)}>삭제</button>
              </div>
            );
          })}
        </Box>
      }
    </>
  );
};

export default History;
