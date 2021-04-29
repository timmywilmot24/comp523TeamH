import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import TabYear from "../components/TabYear.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";

const screenWidth = Dimensions.get("window").width;
export default class Classes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: "",
      year: "All",
      subject: "Business",
    };
  }

  loadData() {
    const path = `${FileSystem.cacheDirectory}track`;
    FileSystem.readAsStringAsync(path).then((data) => {
      this.setState({ track: JSON.parse(data), dataLoaded: true });
    });
  }

  renderClassData(subject, year) {
    let classView = [];
    let semesterClassRender = [];
    let electiveClassRender = [];
    let electiveNoteRender = "";
    let englishClassRender = [];
    let englishNoteRender = "";
    let mathClassRender = [];
    let mathNoteRender = "";
    let scienceClassRender = [];
    let scienceNoteRender = "";
    let socialStudiesClassRender = [];
    let socialStudiesNoteRender = "";
    let languageClassRender = [];
    let languageNoteRender = "";
    let apCourses = [];

    let classes = this.state.track[subject][year].classes;
    let apClasses = this.state.track[subject][year].apCourses;
    for (let type in classes) {
      let typeOfClasses = classes[type];
      if (type === "firstSemester" || type === "secondSemester") {
        for (let c in typeOfClasses) {
          semesterClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "electives") {
        for (let c in typeOfClasses) {
          electiveClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "electivesNotes") {
        electiveNoteRender = <Text key={"elective"}>{typeOfClasses}</Text>;
      } else if (type === "english") {
        for (let c in typeOfClasses) {
          englishClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "englishNotes") {
        englishNoteRender = <Text key={"english"}>{typeOfClasses}</Text>;
      } else if (type === "math") {
        for (let c in typeOfClasses) {
          mathClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "mathNotes") {
        mathNoteRender = <Text key={"math"}>{typeOfClasses}</Text>;
      } else if (type === "science") {
        for (let c in typeOfClasses) {
          scienceClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "scienceNotes") {
        scienceNoteRender = <Text key={"science"}>{typeOfClasses}</Text>;
      } else if (type === "socialStudies") {
        for (let c in typeOfClasses) {
          socialStudiesClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "socialStudiesNotes") {
        socialStudiesNoteRender = <Text key={"social"}>{typeOfClasses}</Text>;
      } else if (type === "language") {
        for (let c in typeOfClasses) {
          languageClassRender.push(
            <View
              key={type + c + "infoContainer" + year}
              //   style={classScreenStyles.regularTextContainer}
            >
              <Text key={type + c + "infoText" + year}>{typeOfClasses[c]}</Text>
            </View>
          );
        }
      } else if (type === "languageNotes") {
        languageNoteRender = <Text key={"language"}>{typeOfClasses}</Text>;
      }
    }
    for (let c in apClasses) {
      apCourses.push(
        <View key={c}>
          <Text key={c}>{apClasses[c]}</Text>
        </View>
      );
    }
    classView = [
      semesterClassRender,
      electiveClassRender,
      electiveNoteRender,
      englishClassRender,
      englishNoteRender,
      mathClassRender,
      mathNoteRender,
      scienceClassRender,
      scienceNoteRender,
      socialStudiesClassRender,
      socialStudiesNoteRender,
      languageClassRender,
      languageNoteRender,
      apCourses,
    ];
    return classView;
  }
  render() {
    let year = 0;

    let freshmanClassRender = [];
    let sophomoreClassRender = [];
    let juniorClassRender = [];
    let seniorClassRender = [];
    if (!this.state.dataLoaded) {
      this.loadData();
    } else {
      let classes = "";
      year = this.state.year;
      switch (year) {
        case "Freshman":
          year = 9;
          break;
        case "Sophomore":
          year = 10;
          break;
        case "Junior":
          year = 11;
          break;
        case "Senior":
          year = 12;
          break;
        default:
          year = 0;
          break;
      }
      for (let subject in this.state.track) {
        if (this.state.track[subject].name === this.state.subject) {
          if (year != 0) {
            freshmanClassRender = this.renderClassData(subject, year);
          } else {
            freshmanClassRender = this.renderClassData(subject, 9);
            sophomoreClassRender = this.renderClassData(subject, 10);
            juniorClassRender = this.renderClassData(subject, 11);
            seniorClassRender = this.renderClassData(subject, 12);
          }
        }
      }
    }
    return (
      <View>
        <View style={classScreenStyles.backButtonContainer}>
          <Pressable
            style={classScreenStyles.buttonStuff}
            onPress={() => this.props.setState(false)}
          >
            <Ionicons
              style={classScreenStyles.backIcon}
              size={25}
              name="caret-back"
            ></Ionicons>
            <Text style={classScreenStyles.backText}>Back</Text>
          </Pressable>
        </View>
        <View>
          <TabYear
            setState={(value) => this.setState({ year: value })}
          ></TabYear>
          <DropDownPicker
            items={[
              { value: "Business", label: "Business" },
              { value: "LawPolitics", label: "Law and Politics" },
              { value: "Theatre", label: "Theatre and Film" },
              { value: "Journalism", label: "Journalism" },
              { value: "NaturalScience", label: "Natural Sciences" },
              { value: "Humanities", label: "Humanities" },
              { value: "Technology", label: "Technology" },
              { value: "Medicine", label: "Medicine" },
            ]}
            defaultValue={this.state.subject}
            containerStyle={classScreenStyles.dropDown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => {
              this.setState({
                subject: item.value,
              });
            }}
          />
        </View>
        <ScrollView style={{ zIndex: -1 }}>
          {this.state.year === "All" ? (
            <View>
              <View>{freshmanClassRender}</View>
              <View>{sophomoreClassRender}</View>
              <View>{juniorClassRender}</View>
              <View>{seniorClassRender}</View>
            </View>
          ) : (
            <View>{freshmanClassRender}</View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const classScreenStyles = StyleSheet.create({
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
  dropDown: {
    marginRight: (screenWidth * 1) / 30,
    width: (screenWidth * 3) / 10,
    height: 40,
    borderRadius: 20,
    zIndex: 100,
  },
  classTypeContainer: {
    backgroundColor: "white",
    padding: screenWidth * (1 / 25),
    width: screenWidth * (13 / 15),
    alignSelf: "center",
    marginVertical: screenWidth * (1 / 40),
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  classTypeTitleContainer: {
    flexDirection: "row",
    paddingVertical: screenWidth * (1 / 70),
    borderRadius: screenWidth * (1 / 70),
    marginBottom: screenWidth * (1 / 25),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  title: {
    color: "#B71914",
    marginLeft: screenWidth * (1 / 70),
    fontSize: 20,
    alignSelf: "center",
  },
  titleIcon: {
    alignSelf: "center",
  },
  regularTextContainer: {
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1,
    marginBottom: screenWidth * (1 / 30),
    paddingBottom: screenWidth * (1 / 30),
  },
  noteContainers: {
    padding: screenWidth * (1 / 25),
    width: "100%",
    alignSelf: "center",
    marginBottom: screenWidth * (1 / 40),
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    backgroundColor: "#F6931D",
  },
});
