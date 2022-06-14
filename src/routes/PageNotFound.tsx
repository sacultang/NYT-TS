import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
const PageNotFound = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const start = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    const pageTimer = setTimeout(() => {
      clearInterval(start);
      navigate('/');
    }, 4000);
    return () => {
      clearTimeout(pageTimer);
      clearInterval(start);
    };
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <Typography variant='h3' padding={10} mt={10}>
        PageNotFound
      </Typography>
      <span style={{ fontSize: 30, color: 'royalblue' }}>{`${count}`}</span>초
      후에 메인 페이지로 이동 합니다
    </Container>
  );
};

export default PageNotFound;
