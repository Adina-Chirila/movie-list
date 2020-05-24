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
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const MovieCard = (props) => {
  const { movie, deleteMovie } = props;
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Card>
        <CardActionArea>
          <CardContent>
            <CardMedia image="" description="movie poster"></CardMedia>
            <Typography variant="h5">{movie.original_title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {movie.release_date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
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
    </>
  );
};

export default MovieCard;
