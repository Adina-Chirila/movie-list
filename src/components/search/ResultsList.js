import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./ResultsList.module.css";

const getPosterUrl = (imageUri) => `https://image.tmdb.org/t/p/w200${imageUri}`;

const ResultsList = (props) => {
  return (
    <React.Fragment>
      {props.movies.map((item) => (
        <Grid container>
          <Grid item xs={3}>
            <img
              src={getPosterUrl(item.poster_path)}
              alt="movie poster"
              className={styles.poster}
            />
          </Grid>
          <Grid item xs={3}>
            {item.original_title}
          </Grid>
          <Grid item xs={2}>
            {item.release_date}
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default ResultsList;
