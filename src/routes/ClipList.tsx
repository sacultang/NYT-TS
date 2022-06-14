import { useState, useEffect } from 'react';
import { News } from '../model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

interface StorageNews extends News {
  main: string;
}

const ClipList = () => {
  const [clipStorageItem, setclipStorageItem] = useState(
    JSON.parse(localStorage.getItem('Clip') || '[]')
  );

  const handleClip = (
    pub_date: string,
    abstract: string,
    main: string,
    _id: string
  ) => {
    const newClip = {
      pub_date,
      abstract,
      main,
      _id,
    };
    let getClip: any = localStorage.getItem('Clip');
    getClip = JSON.parse(getClip);
    if (!clipStorageItem.length) {
      setclipStorageItem([...clipStorageItem, newClip]);
    } else {
      if (!getClip.some((storedate: News) => storedate._id === _id)) {
        setclipStorageItem([...clipStorageItem, newClip]);
      } else {
        setclipStorageItem([
          ...new Set([...getClip.filter((item: News) => item._id !== _id)]),
        ]);
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('Clip', JSON.stringify(clipStorageItem));
  }, [clipStorageItem]);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={2} mt={10}>
          {clipStorageItem.map((item: StorageNews) => {
            return (
              <Grid item lg={6} md={4} sm={12} key={item._id}>
                <Card
                  sx={{
                    padding: 2,
                    boxSizing: 'border-box',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant='h4'
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.023,
                        mb: 1.5,
                      }}
                    >
                      {item.main}
                    </Typography>
                    <Typography variant='body1'>{item.abstract}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      variant='contained'
                      onClick={() =>
                        handleClip(
                          item.pub_date,
                          item.abstract,
                          item.main,
                          item._id
                        )
                      }
                    >
                      {!clipStorageItem.some(
                        (storageItem: News) => storageItem._id === item._id
                      )
                        ? 'Clip'
                        : 'UnClip'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ClipList;
