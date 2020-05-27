import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <AppBar position="sticky">
      {/* <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">News</Typography>
        <Button color="inherit">Login</Button>
        <AccountCircle />
      </Toolbar> */}
      <Toolbar className={styles.header}>
        <Typography variant="h4">
          <LocalMoviesIcon />
          Movie List
        </Typography>

        <div className={styles.accountActionContainer}>
          {props.user && (
            <span className={styles.accountActionItem}>
              Welcome, {props.user.userName.toUpperCase()}!
            </span>
          )}

          {props.user && (
            <>
              <AccountCircleIcon className={styles.accountActionItem} />
              <FavoriteIcon
                className={styles.accountActionItem}
                onClick={props.closeFavorite}
              />
              <ExitToAppIcon
                className={styles.accountActionItem}
                onClick={props.onLogout}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
