import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

export default class ResetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // Does nothing so far. Add functionality to go back to login page
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Reset Password</Text>
      </SafeAreaView>
    );
  }
}
