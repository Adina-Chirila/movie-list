import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Grid,
} from "@material-ui/core";
import posterPlaceholder from "./posterPlaceholder.jpg";

import AddIcon from "@material-ui/icons/Add";

import styles from "./ResultsList.module.css";

const getPosterUrl = (imageUri) => `https://image.tmdb.org/t/p/w200${imageUri}`;

const ResultsList = (props) => (
  <React.Fragment>
    {props.movies.map((item) => (
      <Grid container xs={12}>
        <Grid item xs={2}>
          <img
            className={styles.poster}
            alt=""
            src={
              item.poster_path === null
                ? posterPlaceholder
                : getPosterUrl(item.poster_path)
            }
          />
        </Grid>
        <Grid item xs={3}>
          {item.original_title}
        </Grid>
        <Grid item xs={2}>
          {item.release_date}
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => props.onAdd(item)}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    ))}
  </React.Fragment>
);

export default ResultsList;
