import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  DevSettings,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      email: "",
      account: "",
      title: "",
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
        let title = "";
        if (data.account === "student") {
          title = "Student";
        } else if (data.account === "admin") {
          title = "Administrator";
        } else {
          title = "Master Administrator";
        }
        this.setState({
          account: data.account,
          title: title,
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
                          <View style={settingsScreenStyles.topContainer}>
                            <View style={settingsScreenStyles.iconContainer}>
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
                              >
                                <Ionicons
                                  style={{ marginLeft: 5, marginTop: 5 }}
                                  name="close"
                                  size={screenWidth * (1 / 12)}
                                  color={"white"}
                                ></Ionicons>
                              </Pressable>
                              <Pressable
                                style={{
                                  alignSelf: "flex-end",
                                  marginLeft: "auto",
                                }}
                                onPress={() => this.handleSubmit()}
                              >
                                <Ionicons
                                  style={{
                                    marginRight: 5,
                                    marginTop: 5,
                                  }}
                                  name="checkmark-sharp"
                                  size={screenWidth * (1 / 12)}
                                  color={"white"}
                                ></Ionicons>
                              </Pressable>
                            </View>
                          </View>
                          <View
                            style={settingsScreenStyles.bottomContainer}
                          ></View>
                          <Pressable
                            style={settingsScreenStyles.profilePicEditContainer}
                            onPress={() => this.addPicture()}
                          >
                            <Image
                              source={require("../assets/defaultProfile.png")}
                              style={settingsScreenStyles.profilePicEdit}
                            />
                            <Text style={settingsScreenStyles.editPicText}>
                              Edit
                            </Text>
                          </Pressable>
                        </View>
                      ) : (
                        <View style={settingsScreenStyles.editable}>
                          <View style={settingsScreenStyles.topContainer}>
                            <View style={settingsScreenStyles.iconContainer}>
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
                              >
                                <Ionicons
                                  style={{ marginLeft: 5, marginTop: 5 }}
                                  name="close"
                                  size={screenWidth * (1 / 12)}
                                  color={"white"}
                                ></Ionicons>
                              </Pressable>
                              <Pressable
                                style={{
                                  alignSelf: "flex-end",
                                  marginLeft: "auto",
                                }}
                                onPress={() => this.handleSubmit()}
                              >
                                <Ionicons
                                  style={{
                                    marginRight: 5,
                                    marginTop: 5,
                                  }}
                                  name="checkmark-sharp"
                                  size={screenWidth * (1 / 12)}
                                  color={"white"}
                                ></Ionicons>
                              </Pressable>
                            </View>
                          </View>
                          <View
                            style={settingsScreenStyles.bottomContainer}
                          ></View>
                          <Pressable
                            style={settingsScreenStyles.profilePicEditContainer}
                            onPress={() => this.addPicture()}
                          >
                            <Image
                              style={settingsScreenStyles.profilePicEdit}
                              source={{ uri: this.state.newProfilePic }}
                            ></Image>
                            <Ionicons
                              name="pencil-outline"
                              size={(screenWidth * 1) / 12}
                              style={settingsScreenStyles.editPicText}
                            ></Ionicons>
                          </Pressable>
                        </View>
                      )}
                      <TextInput
                        style={settingsScreenStyles.inputs}
                        placeholder={"First name"}
                        placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
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
                        placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
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
                        placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
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
                        placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
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
                        <View style={{ width: (screenWidth * 1) / 10 }}></View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={settingsScreenStyles.main}>
                        <View style={settingsScreenStyles.editable}>
                          <View style={settingsScreenStyles.topContainer}>
                            <TouchableOpacity
                              onPress={() => this.setState({ edit: true })}
                            >
                              <Ionicons
                                style={settingsScreenStyles.icon}
                                name="create-outline"
                                size={screenWidth * (1 / 14)}
                                color={"white"}
                              ></Ionicons>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={settingsScreenStyles.bottomContainer}
                          ></View>
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
                          <Text style={settingsScreenStyles.preEditInputsName}>
                            {this.state.firstName} {this.state.lastName}
                          </Text>
                          {this.state.account === "student" ? (
                            <View>
                              <Text
                                style={[
                                  settingsScreenStyles.preEditInputs,
                                  { textAlign: "center" },
                                ]}
                              >
                                Student | {this.state.grade}th grade
                              </Text>
                              <Text
                                style={[
                                  settingsScreenStyles.preEditInputs,
                                  { textAlign: "center" },
                                ]}
                              >
                                {this.state.highSchool}
                              </Text>
                            </View>
                          ) : (
                            <Text style={settingsScreenStyles.preEditInputs}>
                              {this.state.title}
                            </Text>
                          )}
                          <Text style={settingsScreenStyles.preEditInputs}>
                            {this.state.email}
                          </Text>
                          <View style={{ height: 40 }}></View>
                        </View>
                        <View></View>
                      </View>
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
    backgroundColor: "#B71914",
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
    backgroundColor: "#DDDDDD",
    marginBottom: 20,
    paddingVertical: 5,
    width: screenWidth,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    padding: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    fontSize: 16,
  },
  main: {
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    marginTop: screenWidth * (15 / 100),
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    marginBottom: 20,
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
    color: "#B71914",
  },
  preEditInputs: {
    marginTop: 5,
    fontSize: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    color: "#B71914",
  },
  preEditInputsName: {
    marginTop: 5,
    fontSize: 24,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    color: "#B71914",
  },
  inputs: {
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
    borderBottomColor: "#B71914",
    color: "#B71914",
  },
  profilePic: {
    marginTop: (screenWidth * 1) / 15,
    width: (screenWidth * 2) / 5,
    height: (screenWidth * 2) / 5,
    backgroundColor: "gray",
    borderRadius: (screenWidth * 1) / 5,
    zIndex: 1,
    position: "absolute",
    borderColor: "white",
    borderWidth: screenWidth * (1 / 100),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  picEdit: {
    alignSelf: "center",
    fontSize: 12,
  },
  topContainer: {
    width: "100%",
    backgroundColor: "#B71914",
    height: screenWidth * (4 / 15),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    width: "100%",
    backgroundColor: "white",
    height: screenWidth * (4 / 15),
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: screenWidth * (1 / 50),
    marginRight: screenWidth * (1 / 50),
  },
  iconContainer: {
    flexDirection: "row",
  },
  profilePicEditContainer: {
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
  },
  profilePicEdit: {
    marginTop: (screenWidth * 1) / 15,
    width: (screenWidth * 2) / 5,
    height: (screenWidth * 2) / 5,
    borderRadius: (screenWidth * 1) / 5,
    borderColor: "white",
    borderWidth: screenWidth * (1 / 100),
  },
  editPicText: {
    position: "absolute",
    zIndex: 2,
    marginTop: (screenWidth * 5) / 15,
    // backgroundColor: "rgba(0,0,0,0.1)",
    width: "70%",
    color: "white",
    textAlign: "center",
  },
});
