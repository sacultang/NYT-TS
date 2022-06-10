import React, {
  useEffect,
  FC,
  FormEvent,
  useState,
  useRef,
  useCallback,
} from 'react';

// library
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

// component
import CardList from './components/CardList';
import Search from './components/Search';
import Header from './components/Header';

// type
import { News } from './model';

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  // 데이터 요청

  const getData = (query: string, page: number) => {
    setLoading(true);
    setError(false);
    const API_KEY = '9NtLMxmAG09fgLDdyjyl5CG3y4uGk1EE';
    axios({
      method: 'GET',
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}`,
      params: { q: query, page },
    })
      .then((res) => {
        // console.log(res.data.response.docs);
        setNews((prevNews) => {
          return [...new Set([...prevNews, ...res.data.response.docs])];
        });
        setHasMore(res.data.response.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    getData(search, page);
    setPage(1);
  };

  // observer
  const observer = useRef<HTMLDivElement | any>(null);

  const lastBookelementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible');
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    getData(search, page);
  }, [page]);
  return (
    <>
      <Header />
      <Container>
        <Search setSearch={setSearch} click={handleClick} />
        <>
          <Container>
            <Grid container spacing={2} mt={10}>
              {news.map((item, idx) => {
                if (news.length === idx + 1) {
                  return (
                    <>
                      <Grid
                        item
                        md={4}
                        key={item.headline.main}
                        ref={lastBookelementRef}
                      >
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
                              Read More
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Grid item md={4} key={item.headline.main}>
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
                              Read More
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </>
                  );
                }
              })}
            </Grid>
          </Container>
        </>
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
      </Container>
    </>
  );
};

export default App;
