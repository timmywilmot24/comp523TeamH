import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FlatGrid } from "react-native-super-grid";
import CheckBox from "./CheckBox";
const screenWidth = Dimensions.get("window").width;
import LoadingAnimationScreen from "./LoadingAnimationScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import IGRotator from "./IGRotator";

export default class AdminQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "",
      newImage: "",
      newAction: "",
      responseAdd: false,
      responses: [],
      newSubjects: [],
      newResponseError: "",
      newQuestionError: "",
      uploadLoading: false,
    };
  }

  async addPicture() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
    } else {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        this.setState({
          newImage: pickerResult.uri,
        });
      }
    }
  }

  handleAddResponse() {
    if (this.state.newImage === "") {
      this.setState({ newResponseError: "Image not uploaded." });
    } else if (this.state.newAction === "") {
      this.setState({ newResponseError: "Action not defined." });
    } else if (this.state.newSubjects.length === 0) {
      this.setState({ newResponseError: "No subject selected." });
    } else {
      let newResponse = {
        pic: this.state.newImage,
        action: this.state.newAction,
        subject: this.state.newSubjects,
      };
      let responses = this.state.responses;
      responses.push(newResponse);
      this.setState({
        responses: responses,
        responseAdd: false,
        newImage: "",
        newAction: "",
        newSubjects: [],
        newResponseError: "",
      });
    }
  }

  async handleAddQuestion() {
    if (this.state.categoryName === "") {
      this.setState({ newQuestionError: "No category entered" });
    } else {
      this.setState({
        uploadLoading: true,
      });
      for (let i = 0; i < this.state.responses.length; i++) {
        const response = await fetch(this.state.responses[i].pic);
        const blob = await response.blob();

        this.props.db
          .storage()
          .ref("quizImages/responses/" + this.props.newQuestionNumber)
          .child("q" + this.props.newQuestionNumber + "r" + i)
          .put(blob)
          .then(() => {
            this.props.db
              .storage()
              .ref(
                "/quizImages/responses/" +
                  this.props.newQuestionNumber +
                  "/q" +
                  this.props.newQuestionNumber +
                  "r" +
                  i
              )
              .getDownloadURL()
              .then((url) => {
                this.uploadToDatabase(url, i);
                this.props.db
                  .database()
                  .ref("quiz/categoryQuestions/" + this.props.newQuestionNumber)
                  .update({ category: this.state.categoryName })
                  .then(() => {
                    if (i == this.state.responses.length - 1) {
                      this.props.setState(false);
                    }
                  })
                  .catch(() => {
                    Alert.alert(
                      "Unable to connect to database. Try resetting your Internet or reconnecting."
                    );
                  });
              })
              .catch(() => {
                Alert.alert(
                  "Unable to connect to database. Try resetting your Internet or reconnecting."
                );
              });
          })
          .catch(() => {
            Alert.alert(
              "Unable to connect to database. Try resetting your Internet or reconnecting."
            );
          });
      }
      this.props.db
        .database()
        .ref("quiz/numberOfQuestions")
        .get()
        .then((numQuestions) => {
          let newNumber = numQuestions.val() + 1;
          this.props.db
            .database()
            .ref("quiz")
            .update({ numberOfQuestions: newNumber });
        })
        .catch(() => {
          Alert.alert(
            "Unable to connect to database. Try resetting your Internet or reconnecting."
          );
        });
    }
  }

  uploadToDatabase(url, i) {
    let subject = this.state.responses[i].subject;
    for (let j = 0; j < this.state.responses[i].subject.length; j++) {
      if (subject[j] === "Law and Politics") {
        subject[j] = "LawPolitics";
      }
      if (subject[j] === "Theatre and Film") {
        subject[j] = "Theatre";
      }
      if (subject[j] === "Natural Sciences") {
        subject[j] = "NaturalScience";
      }
    }
    this.props.db
      .database()
      .ref(
        "quiz/categoryQuestions/" +
          this.props.newQuestionNumber +
          "/responses/" +
          i
      )
      .update({
        pic: url,
        action: this.state.responses[i].action,
        subject: subject,
      })
      .catch(() => {
        Alert.alert(
          "Unable to connect to database. Try resetting your Internet or reconnecting."
        );
      });
  }

  handleCheck(type, check) {
    let subjects = this.state.newSubjects;
    if (check) {
      subjects.push(type);
    } else {
      let index = subjects.indexOf(type);
      subjects.splice(index, 1);
    }
    this.setState({
      newSubjects: subjects,
    });
  }

  handleDeleteResponse(action) {
    let responses = this.state.responses;
    let index = 0;
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].action === action) {
        index = i;
      }
    }
    responses.splice(index, 1);
    this.setState({
      responses: responses,
    });
  }

  renderSubjects(response) {
    let subjects = [<Text key={-1}>Subjects: </Text>];
    for (let i = 0; i < response.subject.length; i++) {
      subjects.push(<Text key={i}>{response.subject[i]}</Text>);
      if (i < response.subject.length - 1) {
        subjects.push(<Text key={i + "1"}>, </Text>);
      }
    }
    return <View style={{ flexDirection: "row" }}>{subjects}</View>;
  }
  render() {
    let checkBoxList1 = [];
    let checkBoxList2 = [];
    let subjects = [
      "Business",
      "Law and Politics",
      "Theatre and Film",
      "Journalism",
      "Natural Sciences",
      "Humanities",
      "Technology",
      "Medicine",
    ];
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        checkBoxList1.push(
          <CheckBox
            key={i}
            subject={subjects[i]}
            setState={(check) => {
              this.handleCheck(subjects[i], check);
            }}
          />
        );
      } else {
        checkBoxList2.push(
          <CheckBox
            key={i}
            subject={subjects[i]}
            setState={(check) => {
              this.handleCheck(subjects[i], check);
            }}
          />
        );
      }
    }
    return (
      <View>
        <View style={addQuestionStyles.backButtonContainer}>
          <Pressable
            style={addQuestionStyles.buttonStuff}
            onPress={() => this.props.setState(false)}
          >
            <Ionicons
              style={addQuestionStyles.backIcon}
              size={25}
              name="caret-back"
            ></Ionicons>
            <Text style={addQuestionStyles.backText}>Back</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this.state.uploadLoading ? (
            <LoadingAnimationScreen></LoadingAnimationScreen>
          ) : (
            <View style={{ marginBottom: (screenWidth * 1) / 3.75 }}>
              <TextInput
                placeholder="Type category name here..."
                value={this.state.categoryName}
                onChangeText={(categoryName) => this.setState({ categoryName })}
                style={addQuestionStyles.categoryText}
                label="CategoryName"
              />
              {this.state.responses.length > 0 && (
                <IGRotator
                  responses={this.state.responses}
                  setState={(responses) =>
                    this.setState({ responses: responses })
                  }
                ></IGRotator>
              )}
              {this.state.responseAdd ? (
                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 20,
                    borderRadius: 10,
                    marginTop: 20,
                    marginBottom: 180,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 8,
                      width: screenWidth - 56,
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        this.setState({
                          responseAdd: false,
                          newImage: "",
                          newAction: "",
                          newSubjects: [],
                          newResponseError: "",
                        })
                      }
                    >
                      <Ionicons
                        name="close"
                        color={"#B71914"}
                        size={35}
                      ></Ionicons>
                    </Pressable>
                    <Pressable onPress={() => this.handleAddResponse()}>
                      <Ionicons
                        name="checkmark-outline"
                        color={"#B71914"}
                        size={35}
                      ></Ionicons>
                    </Pressable>
                  </View>
                  {this.state.newImage !== "" ? (
                    <Pressable onPress={() => this.addPicture()}>
                      <Image
                        style={{
                          width: 250,
                          height: 250,
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        source={{ uri: this.state.newImage }}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => this.addPicture()}
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 250,
                        height: 250,
                        backgroundColor: "#DDDDDD",
                      }}
                    ></Pressable>
                  )}
                  <TextInput
                    placeholder="Type response action here..."
                    style={addQuestionStyles.newResponseText}
                    value={this.state.newAction}
                    onChangeText={(newAction) => this.setState({ newAction })}
                    label="newAction"
                  ></TextInput>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      marginVertical: 10,
                      color: "#B71914",
                    }}
                  >
                    Subjects
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <View>{checkBoxList1}</View>
                    <View>{checkBoxList2}</View>
                  </View>
                  <Text style={{ color: "#B71914", textAlign: "center" }}>
                    {this.state.newResponseError}
                  </Text>
                </View>
              ) : (
                <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <Pressable
                    onPress={() => this.setState({ responseAdd: true })}
                    style={{ paddingLeft: 10 }}
                  >
                    <Ionicons name="add" color={"#B71914"} size={35} />
                  </Pressable>
                </View>
              )}
              {this.state.responses.length > 1 && (
                <View>
                  <View
                    style={{
                      backgroundColor: "#DDDDDD",
                      alignItems: "center",
                      marginVertical: 25,
                    }}
                  >
                    <Text
                      onPress={() => {
                        this.handleAddQuestion();
                      }}
                      style={{
                        textAlign: "center",
                        paddingVertical: 15,
                      }}
                    >
                      Add new question
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#B71914", textAlign: "center" }}>
                      {this.state.newQuestionError}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const addQuestionStyles = StyleSheet.create({
  responseImage: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
    marginRight: "auto",
  },
  action: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
  categoryText: {
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  backButtonContainer: {
    backgroundColor: "#DDDDDD",
    padding: screenWidth * (1 / 50),
    marginBottom: screenWidth * (1 / 50),
  },
  buttonStuff: {
    flexDirection: "row",
  },
  backIcon: {
    alignSelf: "center",
  },
  backText: {
    alignSelf: "center",
  },
  newResponseText: {
    fontSize: 16,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
});
