import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import Rating from "./Rating";

const MovieCard = (props) => {
  const { movie, changeRating } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia />
        <Typography variant="h5">{movie.original_title}</Typography>
        <Typography variant="subtitle2">Movie description</Typography>
        <CardContent></CardContent>
      </CardActionArea>
      <div>
        <Rating
          userRating={props.movie.userRating}
          changeRating={changeRating}
          movie={movie}
        />
      </div>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
