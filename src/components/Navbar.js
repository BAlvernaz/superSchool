import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

const Navbar = () => {
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static" style={{alignItems: 'center'}}>
        <Toolbar>
          <Typography variant="h6" >Super School</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect()(Navbar);
