import { News } from '../model';

// Mui Library
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

//
import { FormEvent, Ref } from 'react';
import { Link } from 'react-router-dom';

// Components
import Search from './Search';

interface Props {
  news: News[];
  setLastIntersectingImage?: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
  loading: boolean;
  error: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (e: FormEvent) => void;
  lastBookelementRef: (node: any) => void;
}

const CardList = ({
  news,
  loading,
  error,
  setSearch,
  handleClick,
  lastBookelementRef,
}: Props) => {
  return (
    <>
      <Container>
        <Search setSearch={setSearch} click={handleClick} />
        <>
          <Container>
            <Grid container spacing={2} mt={10}>
              {news.map((item, idx) => {
                if (news.length === idx + 1) {
                  return (
                    <Grid item md={4} ref={lastBookelementRef} key={item.uri}>
                      <Card
                        sx={{
                          minWidth: 300,
                          maxWidth: 500,
                          minHeight: 200,
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
                          <Typography variant='body1'>
                            {item.abstract}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size='small' sx={{ color: 'gray' }}>
                            Clip
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item md={4} key={item.uri}>
                      <Card
                        sx={{
                          minWidth: 300,
                          maxWidth: 500,
                          minHeight: 200,
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
                          <Typography variant='body1'>
                            {item.abstract}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link to='/news/id'>
                            <Button size='small' sx={{ color: 'gray' }}>
                              Clip
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Container>
        </>

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
      </Container>
    </>
  );
};

export default CardList;
