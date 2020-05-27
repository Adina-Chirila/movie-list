import React from "react";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, Grid, Paper } from "@material-ui/core";
import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <div className={styles.form}>
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
              required
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

      {/* <h2>Hello stranger!</h2>
      <h4>What is your name?</h4>
      <input onChange={this.props.inputChange} />
      <button onClick={this.handleAddUser}>Save</button> */}
    </div>
  );
};

export default LoginForm;
