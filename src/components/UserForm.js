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
import { toggleDialog } from "../reducers/toggleActions"

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
      school: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { student } = this.props;
    if (student) {
      this.setState({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      image: student.image,
      password: student.password,
      school: student.school
      });
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.dialogToggle();
    this.props.newStudent(this.state);
  }

  onSubmitEdit(ev) {
    ev.preventDefault();
    this.props.dialogToggle();
    this.props.studentEdit(this.props.student.id, this.state );
  }
  render() {
    const { school } = this.state;
    const { schools, student } = this.props;
    const { onSubmit, onChange, onSubmitEdit } = this;
    return (
      <div>
        <form onSubmit={student ? onSubmitEdit : onSubmit}>
        <FormControl
            style={{
              marginLeft: "10px",
              minWidth: "240px",
            }}
          >
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
          {inputs.map((input, idx) => (
            <TextField
              key={idx}
              label={input.replace("_", " ")}
              value={this.state[input]}
              onChange={onChange}
              name={input}
              type={
                input === "password"
                  ? "password"
                  : input === "email"
                  ? "email"
                  : "text"
              }
            />
          ))}
            <Select
              name="school"
              value={school}
              onChange={onChange}
              autoWidth
              label="School That You Attend"
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
          </div>
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

const stateToProps = ({ schools }, { student, history }) => {
  return {
    schools,
    student,
    history
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
    studentEdit: (id, data) => dispatch(editStudent(id, data)),
    dialogToggle: () => dispatch(toggleDialog())
  };
};

export default connect(stateToProps, dispatchToProps)(UserForm);
