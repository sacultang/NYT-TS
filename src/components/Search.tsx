import React, {
  ChangeEvent,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

import History from "./History";
interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setInputFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
const Search = ({ setSearch, setInputFocus }: Props) => {
  // console.log("render");
  const inputRef = useRef<HTMLInputElement>(null);
  // console.log("render", inputRef);
  useLayoutEffect(() => {
    // console.log("current,", inputRef);
    if (inputRef.current !== null) inputRef.current.focus();
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <>
      <Form>
        <CssTextField
          ref={inputRef}
          type="text"
          sx={{ width: 600 }}
          size="small"
          label="Search.."
          variant="standard"
          onChange={handleChange}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
        />
        <CssButton variant="outlined">Search</CssButton>
      </Form>
      <History />
    </>
  );
};

export default Search;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const CssButton = styled(Button)({
  color: "#454545",
  border: "1px solid #ababab",
  "&:hover": {
    border: "1px solid #000",
    backgroundColor: "rgba(198, 198, 198, 0.239)",
  },
});
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ababab",
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
});
