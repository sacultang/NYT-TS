import { useEffect, FC, useState, useRef, useCallback } from 'react';
import Home from './routes/Home';

// library

import _debounce from 'lodash/debounce';
import { Route, Routes } from 'react-router-dom';

// component

import Header from './components/Header';
import NewsDetail from './components/NewsDetail';

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news/:id' element={<NewsDetail />} />
      </Routes>
    </>
  );
};

export default App;
