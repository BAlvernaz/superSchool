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

  const linkTitles = ["Students", "Schools"]

  
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
                  {linkTitles.map((link,idx) => (
                    <ListItem key={idx}>
                    <Link component={RouterLink} to={`/${link.toLowerCase()}`}>
                      <div style={{display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"}}>
                      <ListItemIcon>
                        {link === "Students" ? <PersonIcon /> : <SchoolIcon />}
                      </ListItemIcon>
                      <ListItemText>
                          <Typography variant="h6">{link}</Typography>
                      </ListItemText>
                      </div>
                      </Link>
                    </ListItem>
                  ))}
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