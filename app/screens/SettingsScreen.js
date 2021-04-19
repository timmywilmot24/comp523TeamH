import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  DevSettings,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";

const screenWidth = Dimensions.get("window").width;

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      email: "",
      dataGrabbed: false,
      firstName: "",
      newFirstName: "",
      lastName: "",
      newLastName: "",
      grade: "",
      newGrade: "",
      highSchool: "",
      newHighSchool: "",
      profilePic: "",
      newProfilePic: "",
      errorText: "",
      errorCode: 0,
      edit: false,
      uploadLoading: false,
    };
  }

  getData() {
    this.state.db
      .database()
      .ref("users/" + this.state.userID)
      .get()
      .then((data) => {
        data = data.val();
        this.setState({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          grade: data.grade,
          highSchool: data.highSchool,
          newFirstName: data.firstName,
          newLastName: data.lastName,
          newGrade: data.grade,
          newHighSchool: data.highSchool,
          profilePic: data.profilePic,
          newProfilePic: data.profilePic,
          dataGrabbed: true,
        });
      });
  }

  async handleSubmit() {
    const { newHighSchool, newFirstName, newLastName, newGrade } = this.state;

    if (!newFirstName.match(/^[A-Z][a-z]+$/)) {
      this.setState({
        errorText: "First name is not valid",
        errorCode: 1,
      });
    } else if (!newLastName.match(/^[A-Z][a-z]+$/)) {
      this.setState({
        errorText: "Last name is not valid",
        errorCode: 2,
      });
    } else if (newHighSchool === "") {
      this.setState({
        errorText: "High school is blank",
        errorCode: 3,
      });
    } else if (
      !(newGrade == 9 || newGrade == 10 || newGrade == 11 || newGrade == 12)
    ) {
      this.setState({
        errorText: "Grade must be 9, 10, 11, or 12",
        errorCode: 4,
      });
    } else if (this.state.newProfilePic === "") {
      this.state.db
        .database()
        .ref("users/" + this.state.userID)
        .update({
          firstName: this.state.newFirstName,
          lastName: this.state.newLastName,
          grade: this.state.newGrade,
          highSchool: this.state.newHighSchool,
        })
        .then(() => {
          this.setState({
            firstName: this.state.newFirstName,
            lastName: this.state.newLastName,
            grade: this.state.newGrade,
            highSchool: this.state.newHighSchool,
            edit: false,
          });
        });
    } else {
      this.setState({
        uploadLoading: true,
      });
      const response = await fetch(this.state.newProfilePic);
      const blob = await response.blob();

      this.state.db
        .storage()
        .ref("usersProfilePics")
        .child(this.state.userID)
        .put(blob)
        .then(() => {
          this.state.db
            .storage()
            .ref("/usersProfilePics/" + this.state.userID)
            .getDownloadURL()
            .then((url) => {
              this.state.db
                .database()
                .ref("users/" + this.state.userID)
                .update({
                  firstName: this.state.newFirstName,
                  lastName: this.state.newLastName,
                  grade: this.state.newGrade,
                  highSchool: this.state.newHighSchool,
                  profilePic: url,
                })
                .then(() => {
                  this.setState({
                    firstName: this.state.newFirstName,
                    lastName: this.state.newLastName,
                    grade: this.state.newGrade,
                    highSchool: this.state.newHighSchool,
                    profilePic: url,
                    edit: false,
                    dataGrabbed: true,
                    uploadLoading: false,
                  });
                });
            });
        });
    }
  }

  handleReset() {
    // If email or password is empty, send alert to prompt user

    this.state.db
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        Alert.alert("Email has been sent to " + this.state.email);
      });
  }

  async addPicture() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
    } else {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        this.setState({
          newProfilePic: pickerResult.uri,
        });
      }
    }
  }

  render() {
    if (!this.state.dataGrabbed) {
      this.getData();
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"Settings"} />
        {/*
         This view below is the main		*/}
        <ScrollView>
          {this.state.dataGrabbed ? (
            // This is when the data is received
            <View>
              {this.state.uploadLoading ? (
                <LoadingAnimationScreen></LoadingAnimationScreen>
              ) : (
                <View>
                  {this.state.edit ? (
                    <View style={settingsScreenStyles.main}>
                      {this.state.newProfilePic === "" ? (
                        <View style={settingsScreenStyles.editable}>
                          <Pressable onPress={() => this.addPicture()}>
                            <Image
                              source={require("../assets/defaultProfile.png")}
                              style={settingsScreenStyles.profilePic}
                            />
                          </Pressable>
                        </View>
                      ) : (
                        <View style={settingsScreenStyles.editable}>
                          <Pressable onPress={() => this.addPicture()}>
                            <Image
                              style={settingsScreenStyles.profilePic}
                              source={{ uri: this.state.newProfilePic }}
                            ></Image>
                          </Pressable>
                        </View>
                      )}
                      <TextInput
                        style={settingsScreenStyles.inputs}
                        placeholder={"First name"}
                        placeholderTextColor={"rgba(180,24,19,0.4)"}
                        value={this.state.newFirstName}
                        onChangeText={(newFirstName) =>
                          this.setState({ newFirstName })
                        }
                        label="First Name"
                      />
                      {this.state.errorCode === 1 ? (
                        <Text style={settingsScreenStyles.error}>
                          {this.state.errorText}
                        </Text>
                      ) : (
                        <Text style={settingsScreenStyles.error}></Text>
                      )}
                      <TextInput
                        style={settingsScreenStyles.inputs}
                        placeholder={"Last name"}
                        placeholderTextColor={"rgba(180,24,19,0.4)"}
                        value={this.state.newLastName}
                        onChangeText={(newLastName) =>
                          this.setState({ newLastName })
                        }
                        label="Last Name"
                      />
                      {this.state.errorCode === 2 ? (
                        <Text style={settingsScreenStyles.error}>
                          {this.state.errorText}
                        </Text>
                      ) : (
                        <Text style={settingsScreenStyles.error}></Text>
                      )}
                      <TextInput
                        style={settingsScreenStyles.inputs}
                        placeholder={"High School"}
                        placeholderTextColor={"rgba(180,24,19,0.4)"}
                        value={this.state.newHighSchool}
                        onChangeText={(newHighSchool) =>
                          this.setState({ newHighSchool })
                        }
                        label="High School"
                      />
                      {this.state.errorCode === 3 ? (
                        <Text style={settingsScreenStyles.error}>
                          {this.state.errorText}
                        </Text>
                      ) : (
                        <Text style={settingsScreenStyles.error}></Text>
                      )}
                      <TextInput
                        style={settingsScreenStyles.inputs}
                        placeholder={"Grade"}
                        placeholderTextColor={"rgba(180,24,19,0.4)"}
                        value={this.state.newGrade}
                        onChangeText={(newGrade) => this.setState({ newGrade })}
                        label="Grade"
                      />
                      {this.state.errorCode === 4 ? (
                        <Text style={settingsScreenStyles.error}>
                          {this.state.errorText}
                        </Text>
                      ) : (
                        <Text style={settingsScreenStyles.error}></Text>
                      )}
                      <View style={settingsScreenStyles.buttonContainer}>
                        <Pressable
                          onPress={() =>
                            this.setState({
                              newFirstName: this.state.firstName,
                              newLastName: this.state.lastName,
                              newHighSchool: this.state.highSchool,
                              newGrade: this.state.grade,
                              newProfilePic: this.state.profilePic,
                              edit: false,
                            })
                          }
                          style={settingsScreenStyles.button}
                        >
                          <Text style={settingsScreenStyles.buttonText}>
                            Cancel
                          </Text>
                        </Pressable>
                        <View style={{ width: (screenWidth * 1) / 10 }}></View>
                        <Pressable
                          onPress={() => this.handleSubmit()}
                          style={settingsScreenStyles.button}
                        >
                          <Text style={settingsScreenStyles.buttonText}>
                            Submit
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  ) : (
                    <View style={settingsScreenStyles.main}>
                      <View style={settingsScreenStyles.editable}>
                        {this.state.profilePic === "" ? (
                          <Image
                            source={require("../assets/defaultProfile.png")}
                            style={settingsScreenStyles.profilePic}
                          />
                        ) : (
                          <Image
                            style={settingsScreenStyles.profilePic}
                            source={{ uri: this.state.profilePic }}
                          ></Image>
                        )}
                        <Text style={settingsScreenStyles.preEditInputs}>
                          {this.state.firstName} {this.state.lastName}
                        </Text>
                        <Text style={settingsScreenStyles.preEditInputs}>
                          {this.state.highSchool} - {this.state.grade}th grade
                        </Text>
                        <Pressable
                          onPress={() => this.setState({ edit: true })}
                          style={settingsScreenStyles.buttonMain}
                        >
                          <Text style={settingsScreenStyles.buttonText}>
                            Edit
                          </Text>
                        </Pressable>
                        <Pressable
                          style={settingsScreenStyles.buttonMain}
                          onPress={() => this.handleReset()}
                        >
                          <Text style={settingsScreenStyles.buttonText}>
                            Reset Password
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() =>
                            this.props.route.params.db
                              .auth()
                              .signOut()
                              .then(() => {
                                DevSettings.reload();
                              })
                          }
                          style={settingsScreenStyles.buttonMain}
                        >
                          <Text style={settingsScreenStyles.buttonText}>
                            Sign out
                          </Text>
                        </Pressable>
                      </View>
                      <View></View>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : (
            // This is before we get the data
            <View style={styles.main}></View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const settingsScreenStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(180,24,19,0.9)",
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },

  buttonMain: {
    backgroundColor: "rgba(180,24,19,0.9)",
    marginTop: 20,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    width: (screenWidth * 1) / 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    padding: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    fontSize: 16,
  },
  main: {
    backgroundColor: "#F4F5F7",
  },
  editable: {
    alignItems: "center",
  },
  error: {
    marginHorizontal: (screenWidth * 2) / 15,
    fontSize: 12,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    padding: 5,
    color: "rgba(180,24,19,0.9)",
  },
  preEditInputs: {
    marginTop: 20,
    fontSize: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    padding: 5,
    // Added these three
    borderBottomWidth: 1,
    borderBottomColor: "rgba(180,24,19,0.9)",
    color: "rgba(180,24,19,0.9)",
  },
  inputs: {
    //backgroundColor: "white",
    marginTop: 12,
    marginHorizontal: (screenWidth * 2) / 15,
    fontSize: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    padding: 5,
    // Added these three
    borderBottomWidth: 1,
    borderBottomColor: "rgba(180,24,19,0.9)",
    color: "rgba(180,24,19,0.9)",
  },
  profilePic: {
    marginTop: (screenWidth * 1) / 15,
    width: (screenWidth * 2) / 5,
    height: (screenWidth * 2) / 5,
    backgroundColor: "gray",
    borderRadius: (screenWidth * 1) / 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
