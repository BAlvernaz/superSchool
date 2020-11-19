import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";
import { toggleSideMenu } from "../reducers/toggleActions";

const Navbar = ({ sideMenuToggle }) => {
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
          <div>
            <Button variant="contained">Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const stateToProps = ({ toggles }) => {
  return {
    sideMenu: toggles.sideMenu,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    sideMenuToggle: () => dispatch(toggleSideMenu()),
  };
};

export default connect(stateToProps, dispatchToProps)(Navbar);
