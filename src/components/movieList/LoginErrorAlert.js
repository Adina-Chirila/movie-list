import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const LoginErrorAlert = (props) => {
  return (
    <div>
      <Dialog
        open={props.loginError}
        onClose={props.closeLoginErrorAlert}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Name is required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="body2">
            Please enter your name before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeLoginErrorAlert} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginErrorAlert;
