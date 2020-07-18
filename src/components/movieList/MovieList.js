import React from "react";
import { Typography, Paper } from "@material-ui/core";
import MovieCard from "./MovieCard";

import styles from "./MovieList.module.css";

class MovieList extends React.Component {
  render() {
    return (
      <Paper className={styles.favoriteContainer} variant="outlined">
        <div className={styles.favoriteMenu}>
          <Typography variant="h3">Favorite movies</Typography>
        </div>
        <div className={styles.movieListContainer}>
          {this.props.savedMovies.length > 0 ? (
            this.props.savedMovies.map((item) => (
              <MovieCard
                movie={item}
                deleteMovie={this.props.deleteMovie}
                key={item.id}
                changeRating={this.props.changeRating}
              />
            ))
          ) : (
            <Typography variant="subtitle1">
              Search for a movie and add it to your list.
            </Typography>
          )}
        </div>
      </Paper>
    );
  }
}

export default MovieList;
