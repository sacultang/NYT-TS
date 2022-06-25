import { FC } from 'react';
import Home from './routes/Home';

// library

import { Route, Routes } from 'react-router-dom';

// component

import Header from './components/Header';
import ClipList from './routes/ClipList';
import PageNotFound from './routes/PageNotFound';

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cliplist' element={<ClipList />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
