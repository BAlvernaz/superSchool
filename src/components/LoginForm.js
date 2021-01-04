import { Button, TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { login } from "../reducers/actions";
import { toggleLogin } from "../reducers/toggleActions";

const textFields = ["email", "password"];

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.signin(this.state)
    this.props.dialogToggle()
  }

  render() {
    const { onChange, handleSubmit } = this;
    return (
      <div style={{
        display: "flex",
        flexDirection: "column"
        }}>
          <form onSubmit={handleSubmit}>
        {textFields.map((tf) => (
          <TextField
            key={tf}
            value={this.state[tf]}
            type={tf}
            onChange={onChange}
            name={tf}
            label={tf
              .split("")
              .map((char, idx) => {
                if (idx === 0) {
                  return char.toUpperCase();
                }
                return char;
              })
              .join("")}
          />
        ))}
          <Button type="submit">Submit</Button>
          <Button onClick={() => {this.props.dialogToggle()}}>Cancel</Button>
          
        </form>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return {
    signin: (creds) => dispatch(login(creds)),
    dialogToggle: () => dispatch(toggleLogin())
  }
}

export default connect(null, dispatchToProps)(LoginForm)