import React, { Component } from "react";
import "./SearchQuestions.css";

class SearchQuestions extends Component {
  state = { value: "" };

  onChangeHandler = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.SearchQuestions(this.state.value);
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

export default SearchQuestions;
