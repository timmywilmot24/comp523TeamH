import React, { Component } from 'react';
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
} from 'react-native';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      highSchool: "",
      grade: "",
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
      this.setState({
        errorText: "Enter email to register",
        errorCode: 3,
      });
    } else if (password === "") {
      this.setState({
        errorText: "Enter password to register",
        errorCode: 4,
      });
    } else if (password !== confirmPassword) {
      this.setState({
        errorText: "Passwords do not match",
        errorCode: 5,
      });
      // If first and last name are not valid
    } else if (!firstName.match(/^[A-Z][a-z]+$/)) {
      this.setState({
        errorText: "First name is not valid",
        errorCode: 1,
      });
    } else if (!lastName.match(/^[A-Z][a-z]+$/)) {
      this.setState({
        errorText: "Last name is not valid",
        errorCode: 2,
      });
    } else if (!(grade == 9 || grade == 10 || grade == 11 || grade == 12)) {
      this.setState({
        errorText: "Grade must be 9, 10, 11, or 12",
        errorCode: 7,
      });
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
              hasTakenQuiz: false,
              quizResult: 0,
            });
          this.setState({
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            highSchool: "",
            grade: "",
          });
          this.props.props.navigation.navigate("Main", {
            uid: auth.user.uid,
          });
        })
        .catch((errorMessage) => {
          if (
            errorMessage.toString() ===
            "Error: The email address is already in use by another account."
          ) {
            this.setState({
              errorText: "Email address already in use",
              errorCode: 3,
            });
          } else if (
            errorMessage.toString() ===
            "Error: Password should be at least 6 characters"
          ) {
            this.setState({
              errorText: "Password is too short",
              errorCode: 4,
            });
          }
        });
    }
  }
  render() {
    return (
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="First name"
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({ firstName })}
            label="First name"
          />
          {this.state.errorCode == 1 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="Last name"
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({ lastName })}
            label="Last name"
          />
          {this.state.errorCode == 2 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            label="Email"
          />
          {this.state.errorCode == 3 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label="Password"
            secureTextEntry={true}
          />
          {this.state.errorCode == 4 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            label="Confirm Password"
            secureTextEntry={true}
          />
          {this.state.errorCode == 5 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="High School"
            value={this.state.highSchool}
            onChangeText={(highSchool) => this.setState({ highSchool })}
            label="High school"
          />
          {this.state.errorCode == 6 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            placeholder="Grade"
            value={this.state.grade}
            onChangeText={(grade) => this.setState({ grade })}
            label="Grade"
          />
          {this.state.errorCode == 7 ? (
            <Text style={{ color: "white" }}>{this.state.errorText}</Text>
          ) : (
            <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
          )}
        </View>
        {this.state.errorCode == 8 ? (
          <Text style={{ color: "white" }}>{this.state.errorText}</Text>
        ) : (
          <Text style={{ color: "#B71914" }}>{this.state.errorText}</Text>
        )}
        <TouchableOpacity
          style={styles.registerButton}
          title="Register"
          onPress={() => this.onRegister()}
        >
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: "80%",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    paddingBottom: "10%",
  },
  inputs: {
    backgroundColor: "white",
    marginTop: 15,
    fontSize: 22,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    padding: 5,
  },
  registerButton: {
    backgroundColor: "#F6931D",
    width: "60%",
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  register: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
