import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NewStudentForm from "./components/NewStudentForm";
import StudentList from "./components/StudentList";
import { connect } from "react-redux";
import { getStudents, getSchools } from "./reducers/actions";
import Navbar from "./components/Navbar";
import SchoolList from "./components/SchoolList";
import { Drawer, Paper } from "@material-ui/core";
import { toggleSideMenu } from "./reducers/toggleActions";

class App extends React.Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadSchools();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Drawer
              open={this.props.sideMenu}
              variant="temporary"
              anchor="left"
              onClose={() => {this.props.sideMenuToggle()}}
            >
              <Paper>
                
              </Paper>
            </Drawer>

            <div>
              <Route component={Navbar} />
              <Route component={StudentList} />
              <Route component={NewStudentForm} />
              <Route component={SchoolList} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const stateToProps = ({ toggles }) => {
  return {
    sideMenu: toggles.sideMenu,
  };
};

const dispatchToProp = (dispatch) => {
  return {
    loadStudents: () => dispatch(getStudents()),
    loadSchools: () => dispatch(getSchools()),
    sideMenuToggle: () => dispatch(toggleSideMenu()),
  };
};

export default connect(stateToProps, dispatchToProp)(App);
