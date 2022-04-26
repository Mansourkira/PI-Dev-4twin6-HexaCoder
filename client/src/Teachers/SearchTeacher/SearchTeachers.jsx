import React, { Component } from "react";
import "./SearchTeachers.css";

class SearchTeachers extends Component {
  state = { value: "" };

  onChangeHandler = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.searchTeachers(this.state.value);
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

export default SearchTeachers;
