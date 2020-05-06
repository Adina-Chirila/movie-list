import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const ResultsList = () => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>Poster</ListItemAvatar>
        <ListItemText
          primary="movie title"
          secondary="Year, Casr"
        ></ListItemText>
      </ListItem>
    </List>
  );
};

export default ResultsList;
