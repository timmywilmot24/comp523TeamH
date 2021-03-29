import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default class ResetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailVerify: "",
    };
  }

  onReset() {
    const { email, emailVerify } = this.state;

    // If email or password is empty, send alert to prompt user
    if (email === "") {
      Alert.alert("Enter email to reset");
    } else if (emailVerify === "") {
      Alert.alert("Enter email to reset");
    } else if (email !== emailVerify) {
      Alert.alert("Emails do not match");
    } else {
      this.setState({
        isLoading: true,
      });

      // Sends reset email
      this.props.route.params.firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.setState({
            isLoading: false,
            email: "",
            emailVerify: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          switch (error.toString()) {
            case "Error: The email address is badly formatted.":
              Alert.alert("The email address entered is invalid.");
            case "Error: There is no user record corresponding to this identifier. The user may have been deleted.":
              Alert.alert(
                "The email address is not associated with an account."
              );
            default:
              Alert.alert(error.toString());
          }
        });
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Reset Password</Text>
        <View>
          <TextInput
            placeholder="Email"
            autoCompleteType="email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            label="Email"
          />
        </View>
        <View>
          <TextInput
            placeholder="Verify email"
            autoCompleteType="email"
            value={this.state.emailVerify}
            onChangeText={(emailVerify) => this.setState({ emailVerify })}
            label="EmailVerify"
          />
        </View>
        <TouchableOpacity title="reset" onPress={() => this.onReset()}>
          <Text>Reset Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="login"
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>Go to login screen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
