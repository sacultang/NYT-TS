import { useEffect, useState, useRef, useCallback } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { addHistory } from "../store/searchSlice";
// type
import { News } from "../model";

// api
const API_KEY = import.meta.env.VITE_API_KEY;

const getDataHooks = (
  search: string,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  // History 추가
  const dispatch = useDispatch();

  const handleAddHistory = (text: string) => {
    // console.log('text', text);
    const SearchHistory = {
      id: Date.now(),
      text,
    };

    dispatch(addHistory(SearchHistory));
  };

  // 데이터 요청
  const getData = async (query: string, page: number) => {
    setLoading(true);
    setError(false);

    await axios({
      method: "GET",
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}`,
      params: { q: query, page, sort: "newest" },
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
    if (search && !loading) {
      const timer = setTimeout(() => {
        getData(search, page);
        setPage(1);
        handleAddHistory(search);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search, page]);

  // Youtube observer
  const observer = useRef<HTMLDivElement | any>(null);

  const lastBookelementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
          getData(search[0], page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return { news, loading, lastBookelementRef, error };
};

export default getDataHooks;
