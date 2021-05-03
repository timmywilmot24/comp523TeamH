import React, { Component } from "react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        <TouchableOpacity
          onPress={() => this.handleClick(!this.state.checked)}
          style={{ flexDirection: "row" }}
        >
          {this.state.checked ? (
            <Ionicons
              name="checkbox-outline"
              color={"#B71914"}
              size={20}
            ></Ionicons>
          ) : (
            <Ionicons
              name="square-outline"
              color={"#B71914"}
              size={20}
            ></Ionicons>
          )}
          <Text style={{ fontSize: 14, margin: 5, color: "#B71914" }}>
            {this.props.subject}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
