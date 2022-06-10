import { FC, FormEvent, useState } from 'react';

// library
import { Container } from '@mui/material';

// component
import CardList from './components/CardList';
import Search from './components/Search';
import Header from './components/Header';
import useNewsSearch from './useNewsSearch';

const App: FC = () => {
  // const [news, setNews] = useState<News[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  // 데이터 요청
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const { news, loading, hasMore, error } = useNewsSearch(search, page);

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
