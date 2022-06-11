import React, { ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

interface Props {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const CssButton = styled(Button)({
  color: '#454545',
  border: '1px solid #ababab',
  '&:hover': {
    border: '1px solid #000',
    backgroundColor: 'rgba(198, 198, 198, 0.239)',
  },
});
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ababab',
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
});

const Search = ({ setSearch }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <Form>
      <CssTextField
        sx={{ width: 600 }}
        type='text'
        size='small'
        label='Search..'
        variant='standard'
        onChange={handleChange}
      />
      <CssButton variant='outlined'>Search</CssButton>
    </Form>
  );
};

export default Search;
