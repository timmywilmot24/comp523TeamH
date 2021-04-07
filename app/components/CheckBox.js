import React, { Component } from "react";
import { Pressable, View, Text } from "react-native";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  handleClick(newChecked) {
    this.setState({ checked: newChecked });
    this.props.setState(newChecked);
  }

  render() {
    return (
      <View>
        <Pressable onPress={() => this.handleClick(!this.state.checked)}>
          {this.state.checked ? (
            <View
              style={{ width: 10, height: 10, backgroundColor: "blue" }}
            ></View>
          ) : (
            <View
              style={{ width: 10, height: 10, backgroundColor: "white" }}
            ></View>
          )}
          <Text>{this.props.subject}</Text>
        </Pressable>
      </View>
    );
  }
}
