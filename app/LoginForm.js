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

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAf1fhK4UkxkVvpL9--RX6azwgPlrkXprI",
  authDomain: "mission-scholarship.firebaseapp.com",
  projectId: "mission-scholarship",
  storageBucket: "mission-scholarship.appspot.com",
  messagingSenderId: "646256727876",
  appId: "1:646256727876:web:f6dbc91e1d6c8971202911",
  measurementId: "G-T5B1DFVWQW",
};

const db = firebase.initializeApp(firebaseConfig);

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
    };
  }

  onLogin() {
    const { email, password } = this.state;
    if (email === "") {
      Alert.alert("Enter email to login");
    } else if (password === "") {
      Alert.alert("Enter password to login");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log("User logged in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.props.navigation.navigate("Home");
        })
        .catch((error) => {
          switch (error.toString()) {
            case "Error: The email address is badly formatted.":
              Alert.alert("The email address is invalid.");
            case "Error: There is no user record corresponding to this identifier. The user may have been deleted.":
              Alert.alert(
                "The email address is not associated with an account."
              );
            case "Error: The password is invalid or the user does not have a password.":
              Alert.alert("The password with the email address is incorrect.");
          }
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.email}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#c0c0c0"
            autoCompleteType="email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            label="Email"
            style={styles.input}
          />
        </View>
        <View style={styles.email}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#c0c0c0"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label="Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <TouchableOpacity title="Login" onPress={() => this.onLogin()}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: -80,
    flex: 1,
    alignItems: "center",
  },
  email: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 250,
    height: 32,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    borderRadius: 4,
    marginBottom: 18,
  },
  login: {
    color: "orange",
    fontSize: 28,
  },
});
