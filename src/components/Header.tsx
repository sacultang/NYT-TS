import { Box, Container } from '@mui/material';

const Header = () => {
  return (
    <Box
      mb={4}
      sx={{
        height: 100,
        borderBottom: '1px solid #3e3e3e',
        fontSize: 40,
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Libre Bodoni, serif',
        position: 'relative',
        fontWeight: 600,
        letterSpacing: -0.9,
        '&::after': {
          marginTop: '1px',
          borderBottom: '1px solid #ccc',
          left: 0,
          bottom: 5,
          width: '100%',
          content: '" "',
          position: 'absolute',
        },
      }}
    >
      <Container style={{ textAlign: 'center' }}>New York Times</Container>
    </Box>
  );
};

export default Header;
