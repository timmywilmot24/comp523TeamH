import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      dataGrabbed: false,
      firstName: "",
      newFirstName: "",
      lastName: "",
      newLastName: "",
      grade: 0,
      newGrade: 0,
      highSchool: "",
      newHighSchool: "",
      edit: false,
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
          firstName: data.firstName,
          lastName: data.lastName,
          grade: data.grade,
          highSchool: data.highSchool,
          newFirstName: data.firstName,
          newLastName: data.lastName,
          newGrade: data.grade,
          newHighSchool: data.highSchool,
          dataGrabbed: true,
        });
      });
  }

  handleSubmit() {
    this.state.db
      .database()
      .ref("users/" + this.state.userID)
      .update({
        firstName: this.state.newFirstName,
        lastName: this.state.newLastName,
        grade: this.state.newGrade,
        highSchool: this.state.newHighSchool,
      });
    this.setState({
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      grade: this.state.newGrade,
      highSchool: this.state.newHighSchool,
      edit: false,
    });
  }

  render() {
    if (!this.state.dataGrabbed) {
      this.getData();
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <View style={styles.header}>
          <SafeAreaView>
            <Text style={styles.headerText}>Settings</Text>
          </SafeAreaView>
        </View>
        {/*
         This view below is the main		*/}
        {this.state.dataGrabbed ? (
          // This is when the data is received
          <View style={styles.main}>
            {this.state.edit ? (
              <View style={styles.main}>
                <Text>First Name: </Text>
                <TextInput
                  style={styles.inputs}
                  placeholder={this.state.firstName}
                  value={this.state.newFirstName}
                  onChangeText={(newFirstName) =>
                    this.setState({ newFirstName })
                  }
                  label="First Name"
                />
                <Text>Last Name: </Text>
                <TextInput
                  style={styles.inputs}
                  placeholder={this.state.lastName}
                  value={this.state.newLastName}
                  onChangeText={(newLastName) => this.setState({ newLastName })}
                  label="Last Name"
                />
                <Text>High School: </Text>
                <TextInput
                  style={styles.inputs}
                  placeholder={this.state.highSchool}
                  value={this.state.newHighSchool}
                  onChangeText={(newHighSchool) =>
                    this.setState({ newHighSchool })
                  }
                  label="High School"
                />
                <Text>Grade: </Text>
                <TextInput
                  style={styles.inputs}
                  placeholder={this.state.grade}
                  value={this.state.newGrade}
                  onChangeText={(newGrade) => this.setState({ newGrade })}
                  label="Grade"
                />
                <Pressable
                  onPress={() =>
                    this.setState({
                      newFirstName: this.state.firstName,
                      newLastName: this.state.lastName,
                      newHighSchool: this.state.highSchool,
                      newGrade: this.state.grade,
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
              <View style={styles.main}>
                <Text>First Name: {this.state.firstName}</Text>
                <Text>Last Name: {this.state.lastName}</Text>
                <Text>Grade: {this.state.grade}</Text>
                <Text>High School: {this.state.highSchool}</Text>
                <Pressable onPress={() => this.setState({ edit: true })}>
                  <Text>Edit</Text>
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          // This is before we get the data
          <View style={styles.main}></View>
        )}

        {/*
         This view below is the navBar		*/}
        <View style={styles.navBar}>
          <Pressable
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon name="home" size={50} color="black" />
            <Text style={styles.navText}>Home</Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("Resource")}
          >
            <Icon name="briefcase" size={50} color="black" />
            <Text style={styles.navText}>Resources</Text>
          </Pressable>
          <Pressable
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("Quiz")}
          >
            <Icon name="check-square" size={50} color="black" />
            <Text style={styles.navText}>Quiz</Text>
          </Pressable>
          <Pressable
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("News")}
          >
            <Icon name="rss-square" size={50} color="black" />
            <Text style={styles.navText}>News</Text>
          </Pressable>
          <Pressable
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Icon name="cog" size={50} color="black" />
            <Text style={styles.navText}>Settings</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F6931D",
  },
  header: {
    height: "13%",
    backgroundColor: "#B71914",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  headerText: {
    marginLeft: 5,
    marginTop: 15,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  inputs: {
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 18,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  main: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#F6931D",
  },
  navBar: {
    height: "10%",
    backgroundColor: "white",
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
  },
  navButton: {
    marginTop: 5,
    alignItems: "center",
    flex: 1,
  },
  navText: {
    color: "black",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
