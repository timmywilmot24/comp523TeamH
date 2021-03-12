import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

export default class ResetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Reset Password</Text>
      </SafeAreaView>
    );
  }
}
