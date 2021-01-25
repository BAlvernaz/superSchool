import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { getStudents, getSchools, userCheck } from "./reducers/actions";

import Routes from "./components/Routes";

class App extends React.Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadSchools();
    this.props.getUser()
  }

  render() {
    const { studentEditDialog } = this.props;
    return (
      <Router>
        <Routes studentEditDialog={studentEditDialog} />
      </Router>
    );
  }
}

const stateToProps = ({ toggles }) => {
  return {
    studentEditDialog: toggles.editStudentDialog,
  };
};

const dispatchToProp = (dispatch) => {
  return {
    loadStudents: () => dispatch(getStudents()),
    loadSchools: () => dispatch(getSchools()),
    getUser: () => dispatch(userCheck())
  };
};

export default connect(stateToProps, dispatchToProp)(App);
