import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
} from "react-native";

import RegisterForm from "../components/RegisterForm.js";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // Just has option to go back to login
  // Add registration stuff in this part
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/backgroundHome.jpg")}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
              <Text>Register below</Text>
              <RegisterForm
                props={this.props}
                firebase={this.props.route.params.firebase}
              ></RegisterForm>
              <Text
                style={styles.login}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                Have an account? Login here
              </Text>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  login: {
    color: "#fff",
    flex: 1,
    fontSize: 20,
  },
});
