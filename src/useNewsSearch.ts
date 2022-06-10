import { useEffect, useState } from 'react';
import axios from 'axios';
import { News } from './model';

const useNewsSearch = (query: string, pageNumber: number) => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [news, setNews] = useState<News[]>([]);
  // const [hasMore, setHasMore] = useState(false);

  const API_KEY = '9NtLMxmAG09fgLDdyjyl5CG3y4uGk1EE';

  // useEffect(() => {
  //   setNews([]);
  // }, [query]);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);
  //   let cancel: () => void;
  //   axios({
  //     method: 'GET',
  //     url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}`,
  //     params: { q: query, page: pageNumber },
  //     cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //   })
  //     .then((res) => {
  //       // console.log(res.data.response.docs);
  //       setNews(res.data.response.docs);
  //       setHasMore(res.data.docs.length > 0);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       if (axios.isCancel(e)) return;
  //       setError(true);
  //     });
  //   return () => cancel();
  // }, [query, pageNumber]);

  // return { loading, error, news, hasMore };
};

export default useNewsSearch;
