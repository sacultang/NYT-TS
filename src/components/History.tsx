import { Box } from '@mui/material';
import { HistoryType } from '../model';
interface Props {
  history: HistoryType[];
  inputFocus: boolean;
}

const History = ({ history, inputFocus }: Props) => {
  return (
    <>
      {inputFocus && (
        <Box
          sx={{
            left: 0,
            right: 0,
            margin: 'auto',
            zIndex: 1,
            position: 'absolute',
            backgroundColor: '#ffffff45',
            p: 2,
            boxSizing: 'border-box',
            maxWidth: '700px',
            minWidth: '400px',
            border: '1px solid #ccc',
          }}
        >
          {history.map((key: HistoryType) => {
            return <div key={key.id}>{key.text}</div>;
          })}
        </Box>
      )}
    </>
  );
};

export default History;
