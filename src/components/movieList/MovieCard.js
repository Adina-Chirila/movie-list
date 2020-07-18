import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import Rating from "./Rating";

import styles from "./MovieCard.module.css";
import posterPlaceholder from "../search/posterPlaceholder.jpg";
import Rating from "./Rating";
import { formatDate } from "../../utils/dateUtils";

const getPosterUrl = (imageUri) => `https://image.tmdb.org/t/p/w400${imageUri}`;

const MovieCard = (props) => {
  const { movie, deleteMovie, changeRating } = props;

  return (
    <Paper className={styles.cardPaper}>
      <Card key={movie.id} style={{ minHeight: "580px" }}>
        <CardActionArea>
          <CardContent>
            <CardMedia
              style={{ width: "216px", height: "324px" }}
              component="img"
              image={
                movie.poster_path === null
                  ? posterPlaceholder
                  : getPosterUrl(movie.poster_path)
              }
              description="movie poster"
            />
            <Typography
              variant="subtitle1"
              style={{
                minHeight: "60px",
                margin: "5px 0",
              }}
            >
              {movie.original_title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Release year: {formatDate(movie.release_date)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <div>
            <Rating
              userRating={props.movie.userRating}
              changeRating={changeRating}
              movieId={movie.id}
            />
          </div>
        </Box>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => deleteMovie(movie)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};
export default MovieCard;
