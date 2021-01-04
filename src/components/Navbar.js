import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";
import { toggleDialog, toggleSideMenu, toggleLogin } from "../reducers/toggleActions";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ sideMenuToggle, dialogToggle, loginToggle }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <MenuIcon
            onClick={() => {
              sideMenuToggle();
            }}
          />
          <Typography variant="h6">Super School</Typography>
          <ButtonGroup>
           <Button
              variant="contained"
              component={RouterLink}
              to={"/register"}
              onClick={() => dialogToggle()}
            >
              Register
            </Button>
            <Button variant="contained" component={RouterLink}
              to={"/login"} onClick={() => loginToggle()}>
              Login
            </Button> 
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const dispatchToProps = (dispatch) => {
  return {
    sideMenuToggle: () => dispatch(toggleSideMenu()),
    dialogToggle: () => dispatch(toggleDialog()),
    loginToggle: () => dispatch(toggleLogin()),
  };
};

export default connect(null, dispatchToProps)(Navbar);
