import { Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      mb={4}
      sx={{
        p: 4,
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
      <Container style={{ textAlign: 'center' }}>
        <div>New York Times</div>
        <Link to='/'>
          <Button>Main</Button>
        </Link>
        <Link to='/clip'>
          <Button>Clip</Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Header;
