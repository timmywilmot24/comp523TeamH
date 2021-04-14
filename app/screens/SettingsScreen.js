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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";

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
      emailSent: false,
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
        {this.state.dataGrabbed ? (
          // This is when the data is received
          <View>
            {this.state.uploadLoading ? (
              <LoadingAnimationScreen></LoadingAnimationScreen>
            ) : (
              <View>
                {this.state.edit ? (
                  <View style={settingsScreenStyles.main}>
                    <Text>Edit Profile Picture:</Text>
                    {this.state.newProfilePic === "" ? (
                      <Pressable onPress={() => this.addPicture()}>
                        <View
                          style={{
                            width: 200,
                            height: 200,
                            backgroundColor: "gray",
                          }}
                        ></View>
                      </Pressable>
                    ) : (
                      <Pressable onPress={() => this.addPicture()}>
                        <Image
                          style={{ width: 200, height: 200 }}
                          source={{ uri: this.state.newProfilePic }}
                        ></Image>
                      </Pressable>
                    )}

                    <Text>First Name: </Text>
                    <TextInput
                      style={settingsScreenStyles.inputs}
                      placeholder={this.state.firstName}
                      value={this.state.newFirstName}
                      onChangeText={(newFirstName) =>
                        this.setState({ newFirstName })
                      }
                      label="First Name"
                    />
                    {this.state.errorCode === 1 ? (
                      <Text>{this.state.errorText}</Text>
                    ) : (
                      <Text></Text>
                    )}
                    <Text>Last Name: </Text>
                    <TextInput
                      style={settingsScreenStyles.inputs}
                      placeholder={this.state.lastName}
                      value={this.state.newLastName}
                      onChangeText={(newLastName) =>
                        this.setState({ newLastName })
                      }
                      label="Last Name"
                    />
                    {this.state.errorCode === 2 ? (
                      <Text>{this.state.errorText}</Text>
                    ) : (
                      <Text></Text>
                    )}
                    <Text>High School: </Text>
                    <TextInput
                      style={settingsScreenStyles.inputs}
                      placeholder={this.state.highSchool}
                      value={this.state.newHighSchool}
                      onChangeText={(newHighSchool) =>
                        this.setState({ newHighSchool })
                      }
                      label="High School"
                    />
                    {this.state.errorCode === 3 ? (
                      <Text>{this.state.errorText}</Text>
                    ) : (
                      <Text></Text>
                    )}
                    <Text>Grade: </Text>
                    <TextInput
                      style={settingsScreenStyles.inputs}
                      placeholder={this.state.grade}
                      value={this.state.newGrade}
                      onChangeText={(newGrade) => this.setState({ newGrade })}
                      label="Grade"
                    />
                    {this.state.errorCode === 4 ? (
                      <Text>{this.state.errorText}</Text>
                    ) : (
                      <Text></Text>
                    )}
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
                      <Text>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={() => this.handleSubmit()}>
                      <Text>Submit</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={settingsScreenStyles.main}>
                    <View style={settingsScreenStyles.editible}>
                      {this.state.profilePic === "" ? (
                        <View
                          style={{
                            width: 200,
                            height: 200,
                            backgroundColor: "gray",
                          }}
                        ></View>
                      ) : (
                        <Image
                          style={{ width: 200, height: 200 }}
                          source={{ uri: this.state.profilePic }}
                        ></Image>
                      )}

                      <Text>First Name: {this.state.firstName}</Text>
                      <Text>Last Name: {this.state.lastName}</Text>
                      <Text>Grade: {this.state.grade}</Text>
                      <Text>High School: {this.state.highSchool}</Text>
                      <Pressable onPress={() => this.setState({ edit: true })}>
                        <Text>Edit</Text>
                      </Pressable>
                    </View>
                    <View>
                      {this.state.emailSent ? (
                        <View>
                          <Text style={{ color: "#F6931D" }}>
                            Email has been sent to {this.state.email}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={{ color: "white" }}>
                            Email has been sent to {this.state.email}
                          </Text>
                        </View>
                      )}
                      <Pressable
                        onPress={() =>
                          this.props.route.params.db
                            .auth()
                            .signOut()
                            .then(() => {
                              DevSettings.reload();
                            })
                        }
                      >
                        <Text>Sign out</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          // This is before we get the data
          <View style={styles.main}></View>
        )}
      </View>
    );
  }
}

const settingsScreenStyles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    minHeight: 1000,
  },
  editible: {},
  inputs: {
    backgroundColor: "white",
    //marginBottom: 20,
    fontSize: 18,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});
