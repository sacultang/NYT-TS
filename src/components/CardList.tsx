import { News } from '../model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { forwardRef, Ref } from 'react';
interface Props {
  detail: {
    news: News[];
    setLastIntersectingImage?: React.Dispatch<
      React.SetStateAction<HTMLDivElement | null>
    >;
  };
  ref: Ref<HTMLDivElement>;
}

const CardList = ({ news }: Props['detail']) => {
  return (
    <>
      <Container>
        <Grid container spacing={2} mt={10}>
          {news.map((item, idx) => (
            <Grid item md={4} key={idx}>
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
                    sx={{ fontWeight: 700, lineHeight: 1.023, mb: 1.5 }}
                  >
                    {item.headline.main}
                  </Typography>
                  <Typography variant='body1'>{item.abstract}</Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' sx={{ color: 'gray' }}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardList;
