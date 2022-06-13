import { FC } from 'react';
import Home from './routes/Home';

// library

import { Route, Routes } from 'react-router-dom';

// component

import Header from './components/Header';
import NewsDetail from './routes/NewsDetail';

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clip' element={<NewsDetail />} />
      </Routes>
    </>
  );
};

export default App;
