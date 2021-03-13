import React, { Component } from "react";
import {
  Text,
  Alert,
  Button,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

// Does absolutely nothing right now
// Add registration functionality later
export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
}
