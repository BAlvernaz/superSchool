import React from "react";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import NewStudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { connect } from "react-redux";
import { getStudents, getSchools } from "./reducers/actions";
import Navbar from "./components/Navbar";
import SchoolList from "./components/SchoolList";
import SideMenu from './components/SideMenu'

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
            <Route component={SideMenu} />
            <div>
              <Route component={Navbar} />
              <Route component={NewStudentForm} />
              <Route exact path="/students" component={StudentList} />
              <Route exact path="/schools" component={SchoolList} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}



const dispatchToProp = (dispatch) => {
  return {
    loadStudents: () => dispatch(getStudents()),
    loadSchools: () => dispatch(getSchools()),
  };
};

export default connect(null, dispatchToProp)(App);
