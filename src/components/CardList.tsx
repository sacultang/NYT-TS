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
  lastBookelementRef: (node: any) => void;
}

const CardList = ({ news, loading, error, lastBookelementRef }: Props) => {
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
                  key={item.headline.main}
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
                      <Button size='small' sx={{ color: 'gray' }}>
                        Clip
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item lg={6} md={4} sm={12} key={item.headline.main}>
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
                      <Button size='small' sx={{ color: 'gray' }}>
                        Clip
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
