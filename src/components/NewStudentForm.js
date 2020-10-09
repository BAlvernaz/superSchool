import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addStudent } from "../reducers/studentReducer";

class NewStudentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      schoolId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    const { name, schoolId } = this.state;
    ev.preventDefault();
    this.props.newStudent({name, school: schoolId});
  }
  render() {
    const { name, schoolId } = this.state;
    const { schools } = this.props;
    const { onSubmit, onChange } = this;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">
            Name: <input name="name" value={name} onChange={onChange} />
          </label>
          <label htmlFor="school">
            School:{" "}
            <select name="schoolId" onChange={onChange}>
              {schools.length > 0 ? (
                schools.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
                ))
              ) : (
                <option value={null}>No Schools to Choose From</option>
              )}
            </select>
          </label>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

const stateToProps = ({ schools }) => {
  return {
    schools,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
  };
};

export default connect(stateToProps, dispatchToProps)(NewStudentForm);
