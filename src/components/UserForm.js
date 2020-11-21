import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addStudent, editStudent } from "../reducers/actions";
import { toggleEditStudentDialog } from "../reducers/toggleActions";

const inputs = ["first_name", "last_name", "email", "image", "password"];

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      image: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { student } = this.props;
    if (student) {
      this.setState({
        name: this.props.student.name,
        schoolId: this.props.student.school,
      });
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    const { schoolId } = this.state;
    ev.preventDefault();
    this.props.newStudent({ name, school: schoolId });
  }

  onSubmitEdit(ev) {
    const { name, schoolId } = this.state;
    ev.preventDefault();
    this.props.toogleDialog();
    this.props.studentEdit(this.props.student.id, { name, school: schoolId });
  }
  render() {
    const { schoolId } = this.state;
    const { schools, student } = this.props;
    const { onSubmit, onChange, onSubmitEdit } = this;
    return (
      <div>
        <form onSubmit={student ? onSubmitEdit : onSubmit}>
          {inputs.map((input, idx) => (
            <TextField
              key={idx}
              id="standard-required"
              label={input.replace("_", " ")}
              value={this.state[input]}
              onChange={onChange}
              name={input}
              type={input === "password"}
            />
          ))}
          <FormControl
            style={{
              marginLeft: "10px",
              minWidth: "240px",
            }}
          >
            <InputLabel id="schoolSelectLabel">
              School That You Attend
            </InputLabel>
            <Select
              name="schoolId"
              value={schoolId}
              onChange={onChange}
              autoWidth
              labelId="schoolSelectLabel"
            >
              {schools.length > 0 ? (
                schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={null}>No Schools to Choose From</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            disableElevation
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const stateToProps = ({ schools }, { student }) => {
  return {
    schools,
    student,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
    studentEdit: (id, data) => dispatch(editStudent(id, data)),
  };
};

export default connect(stateToProps, dispatchToProps)(UserForm);
