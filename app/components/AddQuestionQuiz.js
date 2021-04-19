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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FlatGrid } from "react-native-super-grid";
import CheckBox from "./CheckBox";
const screenWidth = Dimensions.get("window").width;
import LoadingAnimationScreen from "./LoadingAnimationScreen.js";

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
                  });
              });
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
    let subjects = [];
    for (let i = 0; i < response.subject.length; i++) {
      subjects.push(<Text key={i}>{response.subject[i]}</Text>);
    }
    return <View>{subjects}</View>;
  }
  render() {
    let checkBoxList = [];
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
      checkBoxList.push(
        <CheckBox
          key={i}
          subject={subjects[i]}
          setState={(check) => {
            this.handleCheck(subjects[i], check);
          }}
        />
      );
    }
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {this.state.uploadLoading ? (
          <LoadingAnimationScreen></LoadingAnimationScreen>
        ) : (
          <View style={{ marginBottom: (screenWidth * 1) / 3.75 }}>
            <TextInput
              placeholder="Category"
              value={this.state.categoryName}
              onChangeText={(categoryName) => this.setState({ categoryName })}
              label="CategoryName"
            />
            <FlatGrid
              onEndReachedThreshold={0.5}
              itemDimension={screenWidth}
              data={this.state.responses}
              renderItem={({ item }) => (
                <View>
                  <ImageBackground
                    style={styles.responseImage}
                    source={{
                      uri: item.pic,
                    }}
                  >
                    <Text>{item.action}</Text>
                  </ImageBackground>
                  <Text>Subjects</Text>
                  {this.renderSubjects(item)}
                  <Text onPress={() => this.handleDeleteResponse(item.action)}>
                    Delete
                  </Text>
                </View>
              )}
            />
            {this.state.responseAdd ? (
              <View>
                <Text onPress={() => this.addPicture()}>Add Picture</Text>
                {this.state.newImage !== "" ? (
                  <View>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: this.state.newImage }}
                    />
                  </View>
                ) : (
                  <View
                    style={{ width: 100, height: 100, backgroundColor: "gray" }}
                  ></View>
                )}
                <TextInput
                  placeholder="Response action here"
                  value={this.state.newAction}
                  onChangeText={(newAction) => this.setState({ newAction })}
                  label="newAction"
                ></TextInput>
                <Text>Subjects</Text>
                {checkBoxList}
                <Text>{this.state.newResponseError}</Text>
                <Text onPress={() => this.handleAddResponse()}>
                  Add response
                </Text>
                <Text
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
                  Cancel
                </Text>
              </View>
            ) : (
              <Text onPress={() => this.setState({ responseAdd: true })}>
                Add Response
              </Text>
            )}
            {this.state.responses.length > 1 && (
              <View>
                <Text
                  onPress={() => {
                    this.handleAddQuestion();
                  }}
                >
                  Add new question
                </Text>
                <Text>{this.state.newQuestionError}</Text>
              </View>
            )}
            <Text
              onPress={() => {
                this.props.setState(false);
              }}
            >
              Cancel
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  responseImage: {
    width: screenWidth * (7 / 15),
    height: screenWidth * (1 / 2),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  action: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
});
