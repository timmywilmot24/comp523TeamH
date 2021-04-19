import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const screenWidth = Dimensions.get("window").width;

export default class LoadingAnimationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View>
        <View style={{ height: (screenWidth * 1) / 10 }}></View>
        <ActivityIndicator size="large" color="#B71914" />
      </View>
    );
  }
}
