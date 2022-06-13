import { useState, useEffect } from 'react';
import { News } from '../model';

// Mui Library
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  news: News[];
  setLastIntersectingImage?: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
  loading: boolean;
  error: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  lastBookelementRef: (node: HTMLDivElement) => void;
}

const CardList = ({ news, loading, error, lastBookelementRef }: Props) => {
  const [clip, setClip] = useState<string[]>([]);
  const [clipStorageItem, setclipStorageItem] = useState(
    JSON.parse(localStorage.getItem('Clip') || '[]')
  );
  const [flip, setFlip] = useState(false);
  const handleClip = (
    date: string,
    abstract: string,
    head: string,
    _id: string
  ) => {
    const newClip = {
      date,
      abstract,
      head,
      _id,
    };

    if (!clipStorageItem.length) {
      setclipStorageItem([...clipStorageItem, newClip]);
      setClip((item) => [...item, date]);
      setFlip(false);
    } else {
      clipStorageItem.forEach((i: typeof newClip) => {
        if (i.date !== date) {
          setclipStorageItem([...clipStorageItem, newClip]);
          setClip((item) => [...item, date]);
        } else {
          setClip(clip.filter((item) => date !== item));
          let getClip: any = localStorage.getItem('Clip');
          getClip = JSON.parse(getClip);
          setclipStorageItem([
            ...new Set([...getClip.filter((item: any) => item.date !== date)]),
          ]);
        }
      });
    }

    // if (!clip.includes(date)) {
    //   setClip((item) => [...item, date]);
    //   const newClip = {
    //     date,
    //     abstract,
    //     head,
    //   };
    //   setclipStorageItem([...clipStorageItem, newClip]);
    // } else {
    //   setClip(clip.filter((item) => date !== item));
    //   let getClip: any = localStorage.getItem('Clip');
    //   getClip = JSON.parse(getClip);
    //   if (getClip.forEach((i: any) => i.date !== date)) {
    //     setclipStorageItem([
    //       ...new Set([...getClip.filter((item: any) => item.date !== date)]),
    //     ]);
    //   }
    // }
  };

  useEffect(() => {
    localStorage.setItem('Clip', JSON.stringify(clipStorageItem));
  }, [clipStorageItem, clip, flip]);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={2} mt={10}>
          {news.map((item, idx) => {
            if (news.length === idx + 1) {
              return (
                <Grid
                  item
                  lg={6}
                  md={4}
                  sm={12}
                  ref={lastBookelementRef}
                  key={item._id}
                >
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
                        {item.headline.main}
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
                            item.headline.main,
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
            } else {
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
                        {item.headline.main}
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
                            item.headline.main,
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
            }
          })}
        </Grid>
      </Container>

      {loading && (
        <CircularProgress
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        />
      )}

      <div>{error && 'Error'}</div>
    </>
  );
};

export default CardList;
