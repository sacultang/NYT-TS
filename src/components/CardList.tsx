import { useState, useEffect } from "react";

import NewsItem from "./NewsItem";
// Mui Library

import { Container, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { checkClip } from "../functions/function";
import { News } from "../model";
// Type
interface Props {
  news: News[];
  setLastIntersectingImage?: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
  loading: boolean;
  error: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  lastBookelementRef: (node: HTMLDivElement) => void;
}

const CardList = ({ news, loading, error, lastBookelementRef }: Props) => {
  const [clipStorageItem, setclipStorageItem] = useState(
    JSON.parse(localStorage.getItem("Clip") || "[]")
  );

  const handleClip = (newsItem: News) => {
    console.log(newsItem);
    let getClip: News[] = JSON.parse(localStorage.getItem("Clip") || "[]");

    if (!clipStorageItem.length || checkClip(getClip, newsItem._id)) {
      setclipStorageItem([...clipStorageItem, newsItem]);
    } else {
      setclipStorageItem([
        ...new Set([
          ...getClip.filter((item: News) => item._id !== newsItem._id),
        ]),
      ]);
    }
  };

  useEffect(() => {
    localStorage.setItem("Clip", JSON.stringify(clipStorageItem));
  }, [clipStorageItem]);
  return (
    <>
      <Container sx={{ position: "relative" }}>
        <Grid container spacing={2} mt={10}>
          {news.map((item, idx) => {
            if (news.length === idx + 1) {
              return (
                <NewsItem
                  key={item._id}
                  _id={item._id}
                  headline={item.headline}
                  abstract={item.abstract}
                  multimedia={item.multimedia}
                  web_url={item.web_url}
                  uri={item.uri}
                  pub_date={item.pub_date}
                />
              );
            } else {
              return (
                <NewsItem
                  key={item._id}
                  _id={item._id}
                  headline={item.headline}
                  abstract={item.abstract}
                  multimedia={item.multimedia}
                  web_url={item.web_url}
                  uri={item.uri}
                  pub_date={item.pub_date}
                />
              );
            }
          })}
        </Grid>
      </Container>

      {loading && (
        <CircularProgress
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        />
      )}

      <div>{error && "Error"}</div>
    </>
  );
};

export default CardList;
