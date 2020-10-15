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

  const SideMenu = () => {
      return (
          <div>
              <Drawer
              open={this.props.sideMenu}
              variant="temporary"
              anchor="left"
              onClose={() => {
                this.props.sideMenuToggle();
              }}
            >
              <Paper>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Link component={RouterLink} to="/students">
                        <Typography variant="h6">Students</Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Link component={RouterLink} to="/schools">
                        <Typography variant="h6">Schools</Typography>
                      </Link>
                    </ListItemText>
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