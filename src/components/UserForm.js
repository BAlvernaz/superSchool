import { TextField, Divider, Button, Radio } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addStudent, editUser } from "../reducers/actions";
import { toggleDialog } from "../reducers/toggleActions";
import SchoolSelect from "./SchoolSelect";

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
    const { first_name, last_name, image, email } = this.state;
    this.props.dialogToggle();
    this.props.studentEdit({ first_name, last_name, email, image });
  }
  render() {
    const { school, password, password2 } = this.state;
    const { student } = this.props;
    const { onSubmit, onChange, onSubmitEdit } = this;
    return (
      <div style={{padding: 0}}>
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
                    .filter((name) => !name.includes("password"))
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
                        type={input === "email" ? "email" : "text"}
                      />
                    ))}
            </div>
            <Divider style={{ height: "5px" }} />
            <SchoolSelect school={school} onChange={onChange} />
            {!student
              ? radios.map((radio) => {
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
                })
              : ""}
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
        </form>
      </div>
    );
  }
}

const stateToProps = ({}, { student, history }) => {
  return {
    student,
    history,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    newStudent: (data) => dispatch(addStudent(data)),
    studentEdit: (data) => dispatch(editUser(data)),
    dialogToggle: () => dispatch(toggleDialog()),
  };
};

export default connect(stateToProps, dispatchToProps)(UserForm);
