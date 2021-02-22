import React, { Component } from "react";
import { Text, View } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
