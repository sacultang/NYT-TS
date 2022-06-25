import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { News } from "../model";
const NewsItem = (props: News) => {
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
            // onClick={() => handleClip(props._id)}
          >
            {/* {!clipStorageItem.some(
              (storageItem: News) => storageItem._id === props._id
            )
              ? "Clip"
              : "UnClip"} */}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewsItem;
