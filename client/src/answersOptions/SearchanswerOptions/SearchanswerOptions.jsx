import React, { Component } from "react";
import "./SearchStudents.css";

class SearchanswerOptions extends Component {
  state = { value: "" };

  onChangeHandler = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.searchStudents(this.state.value);
      console.log(this.state)
    });
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Filter by name..."
        name="name"
        onChange={ this.onChangeHandler }
        className="Search-Student-Input"
      />
    );
  }
}

export default SearchanswerOptions;