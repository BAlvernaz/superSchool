import React from 'react'
import { connect } from 'react-redux'
import {
    Drawer,
    List,
    ListItem,
    Paper,
    Typography,
    Link,
    ListItemIcon,
    ListItemText,
  } from "@material-ui/core";
  import PersonIcon from "@material-ui/icons/Person";
  import SchoolIcon from "@material-ui/icons/School";
  import { Link as RouterLink} from 'react-router-dom'
  import { toggleSideMenu } from "../reducers/toggleActions";


  // Sidemenu contains links to various sections of website

  // TODO: Make more modular
  
  const SideMenu = ({sideMenu, sideMenuToggle}) => {
      return (
          <div>
              <Drawer
              open={sideMenu}
              variant="temporary"
              anchor="left"
              onClose={() => {
                sideMenuToggle();
              }}
            >
              <Paper>
                <List component="nav">
                  <ListItem>
                  <Link component={RouterLink} to="/students">
                    <div style={{display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center"}}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="h6">Students</Typography>
                    </ListItemText>
                    </div>
                    </Link>
                  </ListItem>
                  <ListItem>
                  <Link component={RouterLink} to="/schools">
                    <div style={{display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center"}}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="h6">Schools</Typography>
                    </ListItemText>
                    </div>
                    </Link>
                  </ListItem>
                </List>
              </Paper>
            </Drawer>
          </div>
      )
  }

  const stateToProps = ({ toggles }) => {
    return {
      sideMenu: toggles.sideMenu,
    };
  };

  const dispatchToProp = (dispatch) => {
    return {
      sideMenuToggle: () => dispatch(toggleSideMenu()),
    };
  };

  export default connect(stateToProps, dispatchToProp)(SideMenu)