import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import LoginForm from "../components/LoginForm.js";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/backgroundHome.jpg")}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
              <Text style={styles.slogan}>Tunnel Vision on Your Mission!</Text>
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              ></Image>
              <LoginForm props={this.props}></LoginForm>

              <Text
                style={styles.forgot}
                onPress={() => this.props.navigation.navigate("Reset")}
              >
                Forgot Password?
              </Text>
              <Text
                style={styles.register}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                No account? Sign up here!
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
  forgot: {
    fontSize: 20,
    flex: 1,
    color: "#fff",
  },
  logo: {
    width: 300,
    borderRadius: 300 / 2,
  },
  register: {
    fontSize: 20,
    flex: 1,
    color: "#fff",
  },
  slogan: {
    color: "#fff",
    textAlign: "center",
    top: 100,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
