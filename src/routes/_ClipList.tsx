import { useState, useEffect } from "react";
import { News } from "../model";

import { Container, Grid } from "@mui/material";
import NewsItem from "../components/NewsItem";
const ClipList = () => {
  const [clipStorageItem, setclipStorageItem] = useState(
    JSON.parse(localStorage.getItem("Clip") || "[]")
  );
  const handleClip = (_id: string) => {
    let getClip: any = localStorage.getItem("Clip");
    getClip = JSON.parse(getClip);
    console.log(getClip);
    setclipStorageItem([
      ...new Set([...getClip.filter((item: News) => item._id !== _id)]),
    ]);
  };

  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem("Clip", JSON.stringify(clipStorageItem));
  }, [clipStorageItem]);

  return (
    <>
      <Container sx={{ position: "relative" }}>
        <Grid container spacing={2} mt={10}>
          {clipStorageItem.map((item: News) => {
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
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ClipList;
