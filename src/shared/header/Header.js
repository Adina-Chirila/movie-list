import React from "react";
import { AppBar, Toolbar, Typography, Tooltip } from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./Header.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <AppBar position="sticky">
      <Toolbar className={styles.header}>
        <Typography variant="h4">
          <LocalMoviesIcon />
          <Link to="/">Movie List</Link>
        </Typography>

        <div className={styles.accountActionContainer}>
          {props.user && (
            <span className={styles.account}>
              Welcome, {props.user.userName.toUpperCase()}!
            </span>
          )}

          {props.user && (
            <>
              {/* <Tooltip title="Account">
                <AccountCircleIcon className={styles.accountActionItem} />
              </Tooltip> */}
              <Link to="/favorites">
                <Tooltip title="Favorite">
                  <FavoriteIcon
                    className={styles.accountActionItem}
                    // onClick={props.closeFavorite}
                  />
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
