import { useSelector, useDispatch } from "react-redux";
import { addClip } from "../store/searchSlice";
import { RootState } from "../store/store";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { checkClip } from "../functions/function";
import { News } from "../model";
const NewsItem = (props: News) => {
  const clipped = useSelector((state: RootState) => state.searchSlice.news);
  const dispatch = useDispatch();

  // 버튼 이벤트
  const handleClip = (props: News) => {
    if (checkClip(clipped, props._id)) {
      dispatch(addClip(props));
    }
  };
  return (
    <Grid item lg={6} md={4} sm={12} key={props._id}>
      <Card
        sx={{
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.023,
              mb: 1.5,
            }}
          >
            {props.headline.main}
          </Typography>
          <Typography variant="body1">{props.abstract}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClip(props)}
          >
            {checkClip(clipped, props._id) ? "Clip" : "UnClip"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewsItem;
