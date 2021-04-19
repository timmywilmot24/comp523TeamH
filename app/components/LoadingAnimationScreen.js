import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default class LoadingAnimationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>Animation goes here...</Text>
      </View>
    );
  }
}
