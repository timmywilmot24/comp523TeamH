import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Create Profile</Text>
      </SafeAreaView>
    );
  }
}
