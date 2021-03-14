import React, { Component } from "react";
import {
  Text,
  Alert,
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "twilmot@live.unc.edu",
      password: "TimmyW24!",
      confirmPassword: "TimmyW24!",
      firstName: "Timmy",
      lastName: "Wilmot",
      highSchool: "West Rowan",
      grade: "12",
    };
  }

  onRegister() {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      highSchool,
      grade,
    } = this.state;

    // If email or password is empty, or password doesn't match, send alert to prompt user
    if (email === "") {
      Alert.alert("Enter email to register");
    } else if (password === "") {
      Alert.alert("Enter password to register");
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      this.setState({
        isLoading: true,
      });
      this.props.firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((auth) => {
          this.props.firebase
            .database()
            .ref("users/" + auth.user.uid)
            .set({
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              highSchool: highSchool,
              grade: grade,
            });
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.props.navigation.navigate("Main", {
            uid: auth.user.uid,
          });
        });
    }
  }
  render() {
    return (
      <View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="First name"
            placeholderTextColor="#c0c0c0"
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({ firstName })}
            label="First name"
            style={styles.input}
          />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="Last name"
            placeholderTextColor="#c0c0c0"
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({ lastName })}
            label="Last name"
            style={styles.input}
          />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#c0c0c0"
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
            style={styles.input}
          />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#c0c0c0"
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            label="Confirm Password"
            style={styles.input}
          />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="High School"
            placeholderTextColor="#c0c0c0"
            value={this.state.highSchool}
            onChangeText={(highSchool) => this.setState({ highSchool })}
            label="High school"
            style={styles.input}
          />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="Grade"
            placeholderTextColor="#c0c0c0"
            value={this.state.grade}
            onChangeText={(grade) => this.setState({ grade })}
            label="Grade"
            style={styles.input}
          />
        </View>
        <TouchableOpacity title="Register" onPress={() => this.onRegister()}>
          <Text style={styles.register}>Register</Text>
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
  register: {
    color: "orange",
    fontSize: 28,
  },
});
