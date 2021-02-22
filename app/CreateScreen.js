import React, { Component } from "react";
import { Text, View } from "react-native";

export default class CreateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Create Profile</Text>
      </View>
    );
  }
}
