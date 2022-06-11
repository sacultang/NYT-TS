import { useEffect, FC, FormEvent, useState, useRef, useCallback } from 'react';

// library
import axios from 'axios';
import _debounce from 'lodash/debounce';
import { Route, Routes } from 'react-router-dom';

// component

import Header from './components/Header';
import NewsDetail from './components/NewsDetail';
import CardList from './components/CardList';

// type
import { News } from './model';

// api
const API_KEY = import.meta.env.VITE_API_KEY;

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
  useEffect(() => {
    setNews([]);
  }, [search]);

  useEffect(() => {
    if (search !== '') {
      if (!loading) {
        const timer = setTimeout(() => {
          getData(search, page);
          setPage(1);
        }, 1500);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [search, page]);
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
          getData(search, page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <CardList
              news={news}
              loading={loading}
              error={error}
              setSearch={setSearch}
              lastBookelementRef={lastBookelementRef}
            />
          }
        />
        <Route path='/news/:id' element={<NewsDetail />} />
      </Routes>
    </>
  );
};

export default App;
