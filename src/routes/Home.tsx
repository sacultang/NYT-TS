import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// Components
import CardList from '../components/CardList';
import Search from '../components/Search';
import History from '../components/History';

// type
import { News } from '../model';

// api
const API_KEY = import.meta.env.VITE_API_KEY;
import { Container } from '@mui/material';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [inputFocus, setInputFocus] = useState(false);

  // History 추가

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]')
  );

  // History 추가 이벤트
  const handleAddHistory = (text: string | number) => {
    // console.log('text', text);
    const newKeyword = {
      id: Date.now(),
      text,
    };

    let getHistory: any = localStorage.getItem('keywords');
    // console.log(getHistory);
    getHistory = JSON.parse(getHistory);

    if (getHistory && getHistory.length === 5) {
      getHistory.pop();
    }
    setHistory([newKeyword, ...getHistory]);
  };

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
          handleAddHistory(search);
        }, 1500);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [search, page]);

  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem('keywords', JSON.stringify(history));
  }, [history]);

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
          getData(search[0], page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <Container style={{ position: 'relative' }}>
      <Search setSearch={setSearch} setInputFocus={setInputFocus} />
      <History history={history} inputFocus={inputFocus} />
      <CardList
        news={news}
        loading={loading}
        error={error}
        setSearch={setSearch}
        lastBookelementRef={lastBookelementRef}
      />
    </Container>
  );
};

export default Home;
