import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { connect } from "react-redux";
import {
  toggleDialog,
  toggleSideMenu,
  toggleLogin,
} from "../reducers/toggleActions";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../reducers/actions";

const Navbar = ({
  sideMenuToggle,
  dialogToggle,
  loginToggle,
  user,
  signOut,
}) => {
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

          {Object.keys(user).length === 0 ? (
            <Typography variant="h6">Super School</Typography>
          ) : (
            <Typography variant="h6">
              Super School: {`Welcome  ${user.first_name} ${user.last_name}`}{" "}
            </Typography>
          )}
          {Object.keys(user).length === 0 ? (
            <ButtonGroup>
              <Button
                variant="contained"
                onClick={() => dialogToggle()}
              >
                Register
              </Button>
              <Button
                variant="contained"
                onClick={() => loginToggle()}
              >
                Login
              </Button>
            </ButtonGroup>
          ) :  user.profile ? (<div>
              <IconButton
                component={RouterLink}
                to={`/students/edit/${user.profile.id}`}
                onClick={() => dialogToggle()}
              >
                <PersonIcon />
              </IconButton>
              <Button variant="contained" onClick={() => signOut()}>
                Logout
              </Button>
              </div>
          ) : <Button variant="contained" onClick={() => signOut()}>
          Logout
        </Button> }
        </Toolbar>
      </AppBar>
    </div>
  );
};
const stateToProps = ({ user }) => {
  return {
    user,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    sideMenuToggle: () => dispatch(toggleSideMenu()),
    dialogToggle: () => dispatch(toggleDialog()),
    loginToggle: () => dispatch(toggleLogin()),
    signOut: () => dispatch(logout()),
  };
};

export default connect(stateToProps, dispatchToProps)(Navbar);
