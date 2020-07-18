import React from "react";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styles from "./LoginForm.module.css";
import LoginErrorAlert from "./LoginErrorAlert";

const LoginForm = (props) => {
  return (
    <div className={styles.form}>
      <LoginErrorAlert
        loginError={props.loginError}
        closeLoginErrorAlert={props.closeLoginErrorAlert}
      />
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Paper className={styles.formPaper} variant="outlined">
          <div className={styles.formTitleContainer}>
            <h2>Hello stranger!</h2>
          </div>

          <FormControl noValidate autoComplete="off">
            <InputLabel htmlFor="input-with-icon-adornment">
              Please enter your name
            </InputLabel>
            <Input
              autoFocus
              id="input-with-icon-adornment"
              onChange={props.onInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={styles.submitContainer}>
            <Button variant="contained" onClick={props.onSubmit}>
              Save
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default LoginForm;
