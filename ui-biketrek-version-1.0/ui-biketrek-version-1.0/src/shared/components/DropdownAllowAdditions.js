import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

class DropdownAllowAdditions extends Component {
  constructor(props) {
    super(props);
    this.user = {
      data: this.props.dataParentToChild,
    };
  }
  state = { options };

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });

  render() {
    const { currentValues } = this.state;
    this.props.callFromParent(currentValues);
    const { data } = this.user;

    return (
      <Dropdown options={this.state.options} placeholder="Choose Tages to enrich your search." search selection fluid multiple allowAdditions value={currentValues} onAddItem={this.handleAddition} onChange={this.handleChange} />
    );
  }
}

export default DropdownAllowAdditions;
