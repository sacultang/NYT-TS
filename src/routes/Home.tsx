import { useState } from "react";

// Components
import CardList from "../components/CardList";
import Search from "../components/Search";
import History from "../components/History";
import getDataHooks from "../hooks/getDataHooks";

import { Container } from "@mui/material";

const Home = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);

  const { news, loading, lastBookelementRef, error } = getDataHooks(
    search,
    page,
    setPage
  );

  // const getHistory = useSelector(
  //   (state: RootState) => state.searchSlice.history
  // );

  return (
    <Container style={{ position: "relative" }}>
      <Search setSearch={setSearch} setInputFocus={setInputFocus} />
      {/* <History inputFocus={inputFocus} /> */}
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
