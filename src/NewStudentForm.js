import React from "react";
import axios from "axios";

export default class NewStudentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ name: ev.target.value });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    await axios.post("http://localhost:8000/api/students/", this.state);
  }
  render() {
      const { name } = this.state
      const { onSubmit, onChange } = this
    return (
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="name" className="inputLables">
            First Name{" "}
            <input name="name" value={name} onChange={onChange} />
          </label>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
