import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";
import { toggleDialog, toggleSideMenu } from "../reducers/toggleActions";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ sideMenuToggle, dialogToggle }) => {
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
            <Button variant="contained" component={RouterLink} to={"/register"} onClick={() => dialogToggle() }>Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// const stateToProps = ({ toggles }) => {
//   return {
//     sideMenu: toggles.sideMenu,
//   };
// };

const dispatchToProps = (dispatch) => {
  return {
    sideMenuToggle: () => dispatch(toggleSideMenu()),
    dialogToggle: () => dispatch(toggleDialog())
  };
};

export default connect(null, dispatchToProps)(Navbar);
