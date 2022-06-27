import { News, newInterface } from "../model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Container, Grid } from "@mui/material";
import NewsItem from "../components/NewsItem";

const ClipList = () => {
  const clipped = useSelector((state: RootState) => state.searchSlice.news);
  const dispatch = useDispatch();
  const handleClip = (_id: string) => {};
  console.log(clipped);
  return (
    <>
      <Container sx={{ position: "relative" }}>
        <Grid container spacing={2} mt={10}>
          {clipped.map((item: News) => {
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
