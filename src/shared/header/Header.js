import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalMoviesIcon fontSize="large" className={styles.identityIcon} />
        <Typography variant="h4">Movie List</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
