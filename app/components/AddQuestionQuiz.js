import React, { Component } from "react";
import {
  Text,
  View,
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
    });
  }

  async handleAddQuestion() {
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

  uploadToDatabase(url, i) {
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
        subject: this.state.responses[i].subject,
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
      <View>
        <TextInput
          placeholder="Category"
          value={this.state.categoryName}
          onChangeText={(categoryName) => this.setState({ categoryName })}
          label="CategoryName"
        />
        <FlatGrid
          onEndReachedThreshold={0.5}
          itemDimension={screenWidth * (1 / 3)}
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
            <Text onPress={() => this.handleAddResponse()}>Add response</Text>
          </View>
        ) : (
          <Text onPress={() => this.setState({ responseAdd: true })}>
            Add Response
          </Text>
        )}
        {this.state.responses.length > 1 && (
          <Text
            onPress={() => {
              this.handleAddQuestion();
            }}
          >
            Add new question
          </Text>
        )}
      </View>
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
