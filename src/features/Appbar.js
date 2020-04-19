import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import pink from "@material-ui/core/colors/pink";

import AccountIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  appbar: {
    backgroundColor: pink[800]
    // textAlign: "center",
  },
  toolbar: {
    justifyContent: "space-between"
  },
  title: {
    fontSize: 32
  }
}));

export default function Appbar(props) {
  const auth = props.authProvider;
  const classes = useStyles();

  function handleSignOut() {
    auth.signOut().then(() => {
      console.log("signed out");
    });
  }

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>Shirtless</div>
        <IconButton edge="end" color="inherit" onClick={() => handleSignOut()}>
          <AccountIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
