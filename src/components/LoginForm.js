import { Button, TextField } from "@material-ui/core";
import React from "react";

const textFields = ["email", "password"]
const buttons = ["submit", "cancel"]

export default class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onClick = this.onClick.bind(this)
  }

  onClick(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    const { onClick } = this
    return (
      <div>
        {textFields.map(tf => <TextField value={this.state[tf]} type={tf} onClick={onClick}/>)}
        {buttons.map(btn => <Button type={btn}>{btn.split("").map((char,idx) => {
            if(idx === 0 ) {
                return char.toUpperCase()
            }
            return char
        }
        )}</Button>)}
      </div>
    );
  }
}
