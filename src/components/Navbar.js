import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import { connect } from "react-redux";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{
          display: "flex",
          flexDirection: 'row',
          justifyContent: 'space-around'
      }}>
        <MenuIcon />
          <Typography variant="h6" >Super School</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect()(Navbar);
