import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import styles from "./Header.module.css";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <LocalMoviesIcon fontSize="large" className={styles.identityIcon} />

        <Typography variant="h4">
          <Link to="/">Movie List</Link>
        </Typography>
        <IconButton>
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </IconButton>
        {props.user && (
          <Button
            color="inherit"
            className={styles.login}
            onClick={props.onLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
