import React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import posterPlaceholder from "./posterPlaceholder.jpg";
import styles from "./ResultsList.module.css";
import { formatDate } from "../../utils/dateUtils";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const getPosterUrl = (imageUri) => `https://image.tmdb.org/t/p/w400${imageUri}`;

const ResultsList = (props) => {
  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 5;
    }

    if (isWidthUp("lg", props.width)) {
      return 4;
    }

    if (isWidthUp("md", props.width)) {
      return 3;
    }

    if (isWidthUp("sm", props.width)) {
      return 2;
    }

    return 1;
  };
  return (
    <GridList
      cellHeight={450}
      cols={getGridListCols()}
      style={{ marginBottom: "20px" }}
      className={styles.resultsListContainer}
    >
      {props.movies.map((item) => (
        <GridListTile key={item.id}>
          <img
            className={styles.poster}
            alt={item.original_title}
            src={
              item.poster_path === null
                ? posterPlaceholder
                : getPosterUrl(item.poster_path)
            }
          />

          <GridListTileBar
            title={item.original_title}
            subtitle={
              <span>Release year: {formatDate(item.release_date)}</span>
            }
            actionIcon={
              <Tooltip title="Add to favorite">
                <IconButton
                  aria-label={`add movie ${item.original_title} to favorites`}
                  onClick={() => props.onAdd(item)}
                >
                  <FavoriteIcon className={styles.addFavorite} />
                </IconButton>
              </Tooltip>
            }
          ></GridListTileBar>
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withWidth()(ResultsList);
