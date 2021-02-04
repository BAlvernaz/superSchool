import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Radio,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addStudent, editStudent } from "../reducers/actions";
import { toggleDialog } from "../reducers/toggleActions";

const inputs = [
  "first_name",
  "last_name",
  "email",
  "image",
  "password",
  "password2",
];
const radios = ["is_student", "is_teacher"];

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      image: "",
      password: "",
      password2: "",
      school: "",
      is_student: true,
      is_teacher: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { student } = this.props;
    if (student) {
      this.setState({
        first_name: student.profile.first_name,
        last_name: student.profile.last_name,
        email: student.profile.email,
        image: student.profile.image,
        school: student.school,
        is_student: student.profile.is_student,
        is_teacher: student.profile.is_teacher,
      });
    }
  }

  onChange(ev) {
    if (ev.target.name !== "is_student" && ev.target.name !== "is_teacher") {
      this.setState({ [ev.target.name]: ev.target.value });
    } else {
      this.setState({
        is_student: !this.state.is_student,
        is_teacher: !this.state.is_teacher,
      });
    }
  }

  onSubmit(ev) {
    const {
      first_name,
      last_name,
      password,
      image,
      email,
      is_student,
      is_teacher,
      password2,
      school,
    } = this.state;
    ev.preventDefault();
    this.props.dialogToggle();
    this.props.newStudent({
      email,
      password,
      first_name,
      last_name,
      image,
      is_student,
      is_teacher,
      school,
      password: password2,
    });
    this.props.history.push("/students");
  }

  onSubmitEdit(ev) {
    ev.preventDefault();
    this.props.dialogToggle();
    this.props.studentEdit(this.props.student.id, this.state);
  }
  render() {
    const { school, password, password2 } = this.state;
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!student
                ? inputs.map((input, idx) => (
                    <TextField
                      key={idx}
                      label={input.replace("_", " ")}
                      value={this.state[input]}
                      onChange={onChange}
                      name={input}
                      type={
                        input.includes("password")
                          ? "password"
                          : input === "email"
                          ? "email"
                          : "text"
                      }
                    />
                  ))
                : inputs
                    .filter((name) => !name.includes("password"))
                    .map((input, idx) => (
                      <TextField
                        key={idx}
                        label={input.replace("_", " ")}
                        value={this.state[input]}
                        onChange={onChange}
                        name={input}
                        type={input === "email" ? "email" : "text"}
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
              {!student ? radios.map((radio) => {
                return (
                  <div key={radio}>
                    <label htmlFor={radio}>
                      {radio
                        .slice(3)
                        .split("")
                        .map((char, idx) => {
                          if (idx === 0) {
                            return char.toUpperCase();
                          }
                          return char;
                        })}
                    </label>
                    <Radio
                      name={radio}
                      onChange={onChange}
                      value={this.state[radio]}
                      checked={this.state[radio] === true}
                    />
                  </div>
                );
              }): "" }
            </div>
            {!student ? (
              <Button
                type="submit"
                color="primary"
                disableElevation
                variant="contained"
                disabled={
                  password !== password2 ? true : !password ? true : false
                }
              >
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                color="primary"
                disableElevation
                variant="contained"
              >
                Submit
              </Button>
            )}
          </FormControl>
        </form>
      </div>
    );
  }
}

const stateToProps = ({ schools }, { student, history }) => {
  return {
    schools,
    student,
    history,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
    studentEdit: (id, data) => dispatch(editStudent(id, data)),
    dialogToggle: () => dispatch(toggleDialog()),
  };
};

export default connect(stateToProps, dispatchToProps)(UserForm);
