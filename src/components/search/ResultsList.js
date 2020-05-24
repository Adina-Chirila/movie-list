import React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import posterPlaceholder from "./posterPlaceholder.jpg";
import styles from "./ResultsList.module.css";

const getPosterUrl = (imageUri) => `https://image.tmdb.org/t/p/w400${imageUri}`;

const ResultsList = (props) => (
  <GridList cellHeight={450} cols={4}>
    {props.movies.map((item) => (
      <GridListTile>
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
          subtitle={<span>Release date: {item.release_date}</span>}
          actionIcon={
            <IconButton
              aria-label={`add movie ${item.original_title} to favorites`}
              onClick={() => props.onAdd(item)}
            >
              <FavoriteIcon className={styles.addFavorite} />
            </IconButton>
          }
        ></GridListTileBar>
      </GridListTile>
    ))}
  </GridList>
);

export default ResultsList;
