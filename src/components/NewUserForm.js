import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Radio,
} from "@material-ui/core";

const inputs = [
  "first_name",
  "last_name",
  "email",
  "image",
  "password",
  "password2",
];

const NewUserForm = () => {
  return (
    <div>
      {inputs.map((input, idx) => (
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
      ))}
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
      })}
    </div>
  );
};

export default NewUserForm;
