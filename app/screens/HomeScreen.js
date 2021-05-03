import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import Classes from "../components/Classes.js";
import CollegeTips from "../components/CollegeTips.js";
import Extra from "../components/Extra.js";
import Tips from "../components/Tips.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;
import * as FileSystem from "expo-file-system";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic: "",
      email: "",
      userGrabbed: false,
      dataGrabbed: false,
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      usersTrack: "",
      track: [],
      studentsObject: "",
      studentsArray: [],
      grade: "",
      classRender: false,
      collegeRender: false,
      extraRender: false,
      tipsRender: false,
      isAdmin: false,
      adminInput: "",
      adminGrade: 0,
      loadingDelete: false,
    };
  }

  loadUserInfo() {
    this.state.db
      .database()
      .ref("users/" + this.state.userID)
      .get()
      .then((data) => {
        this.setState({
          profilePic: data.val().profilePic,
          email: data.val().email,
          usersTrack: data.val().track,
          grade: data.val().grade,
          isAdmin:
            data.val().account === "admin" ||
            data.val().account === "masterAdmin",
          isMaster: data.val().account === "masterAdmin",
          userGrabbed: true,
        });
      });
  }

  loadTrack = async () => {
    const path = `${FileSystem.cacheDirectory}track`;
    let track = await FileSystem.getInfoAsync(path);
    if (!track.exists) {
      this.state.db
        .database()
        .ref("track/")
        .get()
        .then((data) => {
          FileSystem.writeAsStringAsync(path, JSON.stringify(data));
          this.setState({
            track: data.val(),
            dataGrabbed: true,
          });
        });
    } else {
      this.setState({
        dataGrabbed: true,
      });
    }
  };

  loadStudents() {
    this.state.db
      .database()
      .ref("users")
      .get()
      .then((data) => {
        this.setState({
          studentsObject: data.val(),
          dataGrabbed: true,
        });
      });
  }

  handleUpgrade(email) {
    this.setState({
      loadingDelete: true,
    });
    let studentID = "";
    for (let student in this.state.studentsObject) {
      if (this.state.studentsObject[student].email === email) {
        studentID = student;
      }
    }
    this.state.db
      .database()
      .ref("users/" + studentID)
      .update({
        account: "admin",
      })
      .then(() => {
        this.state.db
          .database()
          .ref("admins/" + studentID)
          .set(true)
          .then(() => {
            this.setState({
              loadingDelete: false,
            });
          });
      });
    let studentsObject = this.state.studentsObject;
    studentsObject[studentID].account = "admin";
    this.setState({
      studentsObject: studentsObject,
    });
  }

  handleDelete(email, profilePic) {
    this.setState({
      loadingDelete: true,
    });
    let studentID = "";
    for (let student in this.state.studentsObject) {
      if (this.state.studentsObject[student].email === email) {
        studentID = student;
      }
    }
    this.state.db
      .database()
      .ref("users/" + studentID)
      .remove()
      .then(() => {
        // if (profilePic !== "") {
        // this.state.db
        //   .storage()
        //   .child("usersProfilePics/" + studentID)
        //   .delete()
        //   .then(() => {
        //     this.setState({
        //       loadingDelete: false,
        //     });
        //   })
        //   .catch(() => {
        //     console.log("Didn't work");
        //   });
        // } else {
        this.setState({
          loadingDelete: false,
        });
        // }
      });
    let studentsObjects = this.state.studentsObject;
    delete studentsObjects[studentID];
    this.setState({
      studentObjects: studentsObjects,
    });
  }

  render() {
    let screenRender = (
      <View>
        <ScrollView>
          <View style={{ marginBottom: screenWidth * (1 / 4) }}>
            <TouchableOpacity
              style={homeScreenStyles.classCard}
              onPress={() => this.setState({ classRender: true })}
            >
              <View>
                <Image
                  imageStyle={{ borderRadius: 75 / 2 }}
                  style={homeScreenStyles.cardImageButton}
                  source={require("../assets/dashboardPics/class.jpg")}
                />
              </View>
              <View style={homeScreenStyles.categoryButton}>
                <Text style={homeScreenStyles.buttonText}>Classes</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeScreenStyles.extraCard}
              onPress={() => this.setState({ extraRender: true })}
            >
              <View>
                <Image
                  imageStyle={{ borderRadius: 75 / 2 }}
                  style={homeScreenStyles.cardImageButton}
                  source={require("../assets/dashboardPics/extra.jpg")}
                />
              </View>
              <View style={homeScreenStyles.categoryButton}>
                <Text style={homeScreenStyles.buttonText}>
                  Extracurriculars
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeScreenStyles.tipsCard}
              onPress={() => this.setState({ tipsRender: true })}
            >
              <View>
                <Image
                  imageStyle={{ borderRadius: 75 / 2 }}
                  style={homeScreenStyles.cardImageButton}
                  source={require("../assets/dashboardPics/tips.jpg")}
                />
              </View>
              <View style={homeScreenStyles.categoryButton}>
                <Text style={homeScreenStyles.buttonText}>Tips</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeScreenStyles.collegeCard}
              onPress={() => this.setState({ collegeRender: true })}
            >
              <View>
                <Image
                  imageStyle={{ borderRadius: 75 / 2 }}
                  style={homeScreenStyles.cardImageButton}
                  source={require("../assets/dashboardPics/college.jpg")}
                />
              </View>
              <View style={homeScreenStyles.categoryButton}>
                <Text style={homeScreenStyles.buttonText}>College Tips</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
    let studentView = [];
    if (!this.state.userGrabbed) {
      this.loadUserInfo();
    } else if (!this.state.dataGrabbed) {
      if (this.state.isAdmin) {
        this.loadStudents();
      } else {
        this.loadTrack();
      }
    } else if (!this.state.isAdmin) {
      if (this.state.classRender) {
        screenRender = (
          <Classes
            setState={(classRender) => {
              this.setState({
                classRender: classRender,
              });
            }}
          ></Classes>
        );
      } else if (this.state.collegeRender) {
        screenRender = (
          <CollegeTips
            setState={(collegeRender) => {
              this.setState({
                collegeRender: collegeRender,
              });
            }}
          ></CollegeTips>
        );
      } else if (this.state.extraRender) {
        screenRender = (
          <Extra
            setState={(extraRender) => {
              this.setState({
                extraRender: extraRender,
              });
            }}
          ></Extra>
        );
      } else if (this.state.tipsRender) {
        screenRender = (
          <Tips
            setState={(tipsRender) => {
              this.setState({
                tipsRender: tipsRender,
              });
            }}
          ></Tips>
        );
      }
    } else if (this.state.isAdmin) {
      //Admin side
      let studentsArray = [];
      for (let student in this.state.studentsObject) {
        studentsArray.push(this.state.studentsObject[student]);
      }
      let result = studentsArray.filter((student) => {
        let name = student.firstName + " " + student.lastName;
        return name.toLowerCase().includes(this.state.adminInput.toLowerCase());
      });
      result = result.sort((a, b) => {
        if (a.firstName > b.firstName) {
          return 1;
        } else if (a.firstName < b.firstName) {
          return -1;
        } else {
          return 0;
        }
      });
      if (this.state.adminGrade !== 0) {
        result = result.filter((student) => {
          let grade = student.grade + "";
          let admin = this.state.adminGrade + "";
          return grade === admin;
        });
      }
      let track = "";
      for (let i = 0; i < result.length; i++) {
        track = result[i].track;
        if (result[i].track === "NaturalScience") {
          track = "Natural Sciences";
        } else if (result[i].track === "LawPolitics") {
          track = "Law and Politics";
        }
        studentView.push(
          <View key={i} style={homeScreenStyles.profileContainer}>
            {result[i].profilePic === "" ? (
              <ImageBackground
                imageStyle={{ borderRadius: 75 / 2 }}
                style={homeScreenStyles.profilePic}
                source={require("../assets/defaultProfile.png")}
              />
            ) : (
              <ImageBackground
                imageStyle={{ borderRadius: 75 / 2 }}
                style={homeScreenStyles.profilePic}
                source={{
                  uri: result[i].profilePic,
                }}
              />
            )}
            {result[i].account === "student" ? (
              <View style={homeScreenStyles.profileInfo}>
                <Text
                  style={[
                    homeScreenStyles.profileTextMain,
                    { color: "orange" },
                  ]}
                >
                  {result[i].firstName} {result[i].lastName}
                </Text>
                <Text
                  style={[homeScreenStyles.profileTextSub, { color: "orange" }]}
                >
                  {track} | {result[i].grade}th grade
                </Text>
                <Text
                  style={[homeScreenStyles.profileTextSub, { color: "orange" }]}
                >
                  {result[i].highSchool}
                </Text>
                <Text
                  style={[homeScreenStyles.profileTextSub, { color: "orange" }]}
                >
                  {result[i].email}
                </Text>
              </View>
            ) : (
              <View style={homeScreenStyles.profileInfo}>
                <Text
                  style={[
                    homeScreenStyles.profileTextMain,
                    { color: "#B71914" },
                  ]}
                >
                  {result[i].firstName} {result[i].lastName}
                </Text>
                <Text
                  style={[
                    homeScreenStyles.profileTextSub,
                    { color: "#B71914" },
                  ]}
                >
                  Administrator | | {result[i].grade}th grade
                </Text>
                <Text
                  style={[
                    homeScreenStyles.profileTextSub,
                    { color: "#B71914" },
                  ]}
                >
                  {result[i].highSchool}
                </Text>
                <Text
                  style={[
                    homeScreenStyles.profileTextSub,
                    { color: "#B71914" },
                  ]}
                >
                  {result[i].email}
                </Text>
              </View>
            )}
            <View style={homeScreenStyles.ioniconsContainer}>
              {this.state.isMaster && result[i].account === "student" && (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Warning: Promote to Admin",
                      "Are you sure that you want to promote " +
                        result[i].firstName +
                        " " +
                        result[i].lastName +
                        " to administrator?",
                      [
                        {
                          text: "Yes",
                          onPress: () => this.handleUpgrade(result[i].email),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ],
                      {
                        cancelable: true,
                      }
                    );
                  }}
                >
                  <Ionicons
                    style={homeScreenStyles.ionicon}
                    name="caret-up"
                    size={25}
                    color={"#27A745"}
                  />
                </TouchableOpacity>
              )}
              {this.state.email !== result[i].email && (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Warning: Delete Account",
                      "Are you sure that you want to delete " +
                        result[i].firstName +
                        " " +
                        result[i].lastName +
                        "'s account?",
                      [
                        {
                          text: "Yes",
                          onPress: () =>
                            this.handleDelete(
                              result[i].email,
                              result[i].profilePic
                            ),
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ],
                      {
                        cancelable: true,
                      }
                    );
                  }}
                >
                  <Ionicons
                    style={homeScreenStyles.ionicon}
                    name="trash"
                    size={25}
                    color={"#DC3545"}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      }
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"Dashboard"} />
        {/*
         This view below is the main		*/}
        {this.state.userGrabbed &&
        this.state.dataGrabbed &&
        !this.state.loadingDelete ? (
          <View>
            {this.state.isAdmin ? (
              <View>
                <View style={homeScreenStyles.searchBarContainer}>
                  <TextInput
                    style={homeScreenStyles.searchBar}
                    placeholder={"Search for students..."}
                    value={this.state.adminInput}
                    onChangeText={(adminInput) => this.setState({ adminInput })}
                    label="Search"
                  ></TextInput>
                  <DropDownPicker
                    items={[
                      { value: 0, label: "All grades" },
                      { value: 9, label: "9th grade" },
                      { value: 10, label: "10th grade" },
                      { value: 11, label: "11th grade" },
                      { value: 12, label: "12th grade" },
                    ]}
                    defaultValue={this.state.adminGrade}
                    containerStyle={homeScreenStyles.dropDown}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa" }}
                    onChangeItem={(item) => {
                      this.setState({
                        adminGrade: item.value,
                      });
                    }}
                  />
                </View>
                <ScrollView
                  style={{
                    marginBottom: 200,
                    position: "relative",
                    zIndex: -1,
                  }}
                >
                  <View style={{ marginBottom: screenWidth * 0.5 }}>
                    {studentView}
                  </View>
                </ScrollView>
              </View>
            ) : (
              <View>{screenRender}</View>
            )}
          </View>
        ) : (
          <LoadingAnimationScreen></LoadingAnimationScreen>
        )}
      </View>
    );
  }
}

const homeScreenStyles = StyleSheet.create({
  profileCard: {
    backgroundColor: "white",
  },
  classCard: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "white",
    width: screenWidth * (13 / 15),
    height: screenWidth * (7 / 15),
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  extraCard: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    width: screenWidth * (13 / 15),
    height: screenWidth * (7 / 15),
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  tipsCard: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    width: screenWidth * (13 / 15),
    height: screenWidth * (7 / 15),
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  collegeCard: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    width: screenWidth * (13 / 15),
    height: screenWidth * (7 / 15),
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  searchBar: {
    fontSize: 16,
    width: (screenWidth * 6) / 10,
    padding: (screenWidth * 1) / 50,
    marginHorizontal: (screenWidth * 1) / 30,
    backgroundColor: "#F4F5F7",
    borderRadius: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    width: screenWidth,
    backgroundColor: "#DDDDDD",
    paddingVertical: (screenWidth * 1) / 25,
  },
  dropDown: {
    marginRight: (screenWidth * 1) / 30,
    width: (screenWidth * 3) / 10,
    height: 40,
    borderRadius: 20,
    zIndex: 100,
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: (screenWidth * 1) / 30,
    marginBottom: 0,
    borderRadius: 5,
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    margin: (screenWidth * 1) / 30,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  profileInfo: {
    width: (screenWidth * 5.5) / 10,
    justifyContent: "center",
  },
  profileTextMain: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileTextSub: {
    fontSize: 14,
  },
  textContainer: {
    justifyContent: "center",
  },
  ioniconsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  ionicon: {
    marginVertical: 5,
  },

  /////
  profileCardUserSide: {
    marginVertical: 10,
    flexDirection: "row",
    width: screenWidth * (13 / 15),
    height: screenWidth * (6 / 15),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  profileCardImageContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B71914",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  profileCardRightSide: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageButton: {
    width: (screenWidth * 13) / 15,
    height: screenWidth * (7 / 15),
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(183, 25, 20, 0.6)",
    zIndex: 1,
    position: "absolute",
    width: "60%",
    height: screenWidth * (1 / 11),
    borderRadius: 10,
    marginTop: screenWidth * (1 / 6),
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
});
