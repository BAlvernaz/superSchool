import {
  TextField,
  Divider,
  Button,
  Radio,
  ButtonGroup,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addStudent, editUser, removeStudent, logout } from "../reducers/actions";
import { toggleDialog } from "../reducers/toggleActions";
import SchoolSelect from "./SchoolSelect";

const inputs = [
  "first_name",
  "last_name",
  "email",
  "image",
  "password1",
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
      password1: "",
      password2: "",
      school: "",
      is_student: true,
      is_teacher: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onDelete = this.onDelete.bind(this)
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
      password1,
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
      password1,
      first_name,
      last_name,
      image,
      is_student,
      is_teacher,
      school,
      password2,
    });
    this.props.history.push("/students");
  }

  onDelete () {
    const { dialogToggle, deleteStudent, history, signOut } = this.props
    dialogToggle()
    deleteStudent(this.props.match.params.id)
    signOut()
    history.push('students')
  }
  onSubmitEdit(ev) {
    ev.preventDefault();
    const { first_name, last_name, image, email, school } = this.state;
    const { id } = this.props.match.params
    this.props.dialogToggle();
    this.props.studentEdit({ first_name, last_name, email, image, profile: {school, gpa: 0.00}}, id );
    this.props.history.push("/students");
  }
  render() {
    const { school, password1, password2 } = this.state;
    const { student } = this.props;
    const { onSubmit, onChange, onSubmitEdit, onDelete } = this;
    return (
      <div style={{ padding: 0 }}>
        <form onSubmit={student ? onSubmitEdit : onSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
              }}
            >
              {!student
                ? inputs.map((input, idx) => (
                    <TextField
                      style={{
                        flexBasis: "calc(50% - 10px)",
                        marginRight: "10px",
                      }}
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
                    .filter((name) => !name.includes("password") && !name.includes('email'))
                    .map((input, idx) => (
                      <TextField
                        style={{
                          flexBasis: "calc(50% - 10px)",
                          marginRight: "10px",
                        }}
                        key={idx}
                        label={input.replace("_", " ")}
                        value={this.state[input]}
                        onChange={onChange}
                        name={input}
                        type="text"
                      />
                    ))}
            </div>
            {!student ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <Divider
                  style={{
                    height: "5px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    
                  }}
                />
                <DialogTitle
                  disableTypography
                  style={{ textAlign: "center", marginTop: "1px", padding: 0 }}
                >
                  <h3 style={{ margin: 0 }}>Account Type: </h3>
                </DialogTitle>

                {radios.map((radio) => {
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
                          })
                          .join("")}
                      </label>
                      <Radio
                        name={radio}
                        onChange={onChange}
                        value={this.state[radio]}
                        checked={this.state[radio] === true}
                      />
                    </div>
                  );
                })}
                  <Divider
                    style={{
                      height: "5px",
                      marginTop: "10px",
                      marginBottom: "10px",

                    }}
                  />
                  <DialogTitle
                    disableTypography
                    style={{
                      textAlign: "center",
                      marginTop: "1px",
                      padding: 0,
                    }}
                  >
                    <h3 style={{ margin: 0 }}>Select Your School </h3>
                  </DialogTitle>
                  <SchoolSelect
                    school={school}
                    onChange={onChange}
                    student={student}
                  />
              </div>
            ) : (
              ""
            )}
          </div>
          {!student ? (
            <Button
              type="submit"
              color="primary"
              disableElevation
              variant="contained"
              disabled={
                password1 !== password2 ? true : !password1 ? true : false
              }
            >
              Submit
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                type="submit"
                color="primary"
                disableElevation
                variant="contained"
              >
                Edit Profile Data
              </Button>
              <Button style={{ backgroundColor: "red" }} onClick={onDelete}>
                Delete Student
              </Button>
            </ButtonGroup>
          )}
        </form>
      </div>
    );
  }
}

const stateToProps = ({}, { student, history, match }) => {
  return {
    student,
    history,
    match,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
    studentEdit: (data, id) => dispatch(editUser(data, id)),
    deleteStudent: (id) => dispatch(removeStudent(id)),
    signOut: () => dispatch(logout()),
    dialogToggle: () => dispatch(toggleDialog()),
  };
};

export default connect(stateToProps, dispatchToProps)(UserForm);
