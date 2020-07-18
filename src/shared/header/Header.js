import React from "react";
import { AppBar, Toolbar, Typography, Tooltip } from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <AppBar position="sticky">
      <Toolbar className={styles.header}>
        <Typography variant="h4">
          <LocalMoviesIcon style={{ color: "white" }} />
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Movie List
          </Link>
        </Typography>

        <div className={styles.accountActionContainer}>
          {props.user && (
            <span className={styles.accountActionItem}>
              Welcome, {props.user.userName.toUpperCase()}!
            </span>
          )}

          {props.user && (
            <>
              <Link to="/" className={styles.accountActionItem}>
                <Tooltip title="Home">
                  <HomeIcon />
                </Tooltip>
              </Link>

              <Link to="/favorites" className={styles.accountActionItem}>
                <Tooltip title="Favorites">
                  <FavoriteIcon />
                </Tooltip>
              </Link>

              <Tooltip title="Logout">
                <ExitToAppIcon
                  className={styles.accountActionItem}
                  onClick={props.onLogout}
                />
              </Tooltip>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
