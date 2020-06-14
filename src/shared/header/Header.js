import React from "react";
import { AppBar, Toolbar, Typography, Tooltip } from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <AppBar position="sticky">
      <Toolbar className={styles.header}>
        <Typography variant="h4">
          <LocalMoviesIcon />
          Movie List
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
              <Tooltip title="Favorite">
                <FavoriteIcon
                  className={styles.accountActionItem}
                  onClick={props.closeFavorite}
                />
              </Tooltip>
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
