import { FC, FormEvent, useState } from 'react';

// library
import { Container } from '@mui/material';
import axios from 'axios';

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

  const getData = (query: string, pageNumber: number) => {
    setLoading(true);
    setError(false);
    const API_KEY = '9NtLMxmAG09fgLDdyjyl5CG3y4uGk1EE';
    axios({
      method: 'GET',
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}`,
      params: { q: query, page: pageNumber },
    })
      .then((res) => {
        // console.log(res.data.response.docs);
        setNews(res.data.response.docs);
        setHasMore(res.data.docs.length > 0);
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

  return (
    <>
      <Header />
      <Container>
        <Search setSearch={setSearch} click={handleClick} />
        <CardList news={news} />
      </Container>
    </>
  );
};

export default App;
