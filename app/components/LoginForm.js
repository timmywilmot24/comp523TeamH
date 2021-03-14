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

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
    };
  }

  // Creates function that handles an attempt to login
  onLogin() {
    const { email, password } = this.state;

    // If email or password is empty, send alert to prompt user
    if (email === "") {
      Alert.alert("Enter email to login");
    } else if (password === "") {
      Alert.alert("Enter password to login");
    } else {
      this.setState({
        isLoading: true,
      });

      // Makes firebase call to authorize email and password
      // If successful, log that the user logged in (delete later, for debugging purposes)
      // and navigate to main (Add functionality to send user to Main);
      // If unsuccessful, prompt user with corresponding error message
      this.props.firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((auth) => {
          console.log("User logged in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.props.navigation.navigate("Main", {
            uid: auth.user.uid,
          });
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
      // Renders with two placeholders for user to type info into email and password
      // Login text calls onLogin() when it's pressed
      <View style={styles.container}>
        <View style={styles.inputCont}>
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
        <View style={styles.inputCont}>
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
  inputCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  login: {
    color: "orange",
    fontSize: 28,
  },
});
