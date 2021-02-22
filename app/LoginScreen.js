import React from "react";
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

import LoginForm from "./LoginForm.js";

function HomeScreen(props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.background}
        source={require("./assets/backgroundHome.jpg")}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView>
            <Text style={styles.slogan}>Tunnel Vision on Your Mission!</Text>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("./assets/logo.png")}
            ></Image>
            <LoginForm props={props}></LoginForm>
            <Text>Forgot Password</Text>
            <Text>No account? Sign up here!</Text>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 300,
    borderRadius: 300 / 2,
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

export default HomeScreen;
