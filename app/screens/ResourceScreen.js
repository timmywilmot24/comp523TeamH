import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";
const screenWidth = Dimensions.get("window").width;

export default class ResourceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      resources: {},
      isAdmin: false,
      addResource: false,
      addText: "",
      addURL: "",
      addResourceError: "",
    };
  }

  goToURL(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Cannot go to " + url);
      }
    });
  }

  handleDelete(id) {
    Alert.alert(
      "Warning: Delete Resource",
      "Are you sure that you want to delete this resource?",
      [
        {
          text: "Yes",
          onPress: () => {
            this.props.route.params.db
              .database()
              .ref("resources/" + id)
              .remove()
              .then(() => {
                this.setState({ dataLoaded: false });
              });
          },
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
  }

  newResource(text, url, id) {
    return (
      <View key={id}>
        {this.state.isAdmin ? (
          <View style={resourcesScreenStyles.resourceButton}>
            <Pressable onPress={() => this.goToURL(url)}>
              <Text style={resourcesScreenStyles.resourceButtonText}>
                {text}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => this.handleDelete(id)}
              style={{ marginVertical: 5, marginLeft: "auto", marginRight: 15 }}
            >
              <Ionicons name="trash" size={25} color={"white"} />
            </Pressable>
          </View>
        ) : (
          <View style={resourcesScreenStyles.resourceButton}>
            <Pressable onPress={() => this.goToURL(url)}>
              <Text style={resourcesScreenStyles.resourceButtonText}>
                {text}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  loadData() {
    this.props.route.params.db
      .database()
      .ref("resources")
      .get()
      .then((data) => {
        this.props.route.params.db
          .database()
          .ref("users/" + this.props.route.params.userID + "/account")
          .get()
          .then((admin) => {
            this.setState({
              isAdmin: admin.val() === "admin" || admin.val() === "masterAdmin",
              resources: data,
              dataLoaded: true,
            });
          });
      });
  }

  handleAddResource() {
    if (this.state.addText === "") {
      this.setState({ addResourceError: "Resource name must not be empty." });
    } else if (this.state.addURL === "") {
      this.setState({
        addResourceError: "No URL is given",
      });
    } else {
      Linking.canOpenURL(this.state.addURL).then((supported) => {
        if (supported) {
          this.props.route.params.db
            .database()
            .ref("resources")
            .push({
              text: this.state.addText,
              url: this.state.addURL,
            })
            .then(() => {
              this.setState({
                addResource: false,
                addText: "",
                addURL: "",
                addResourceError: "",
                dataLoaded: false,
              });
            });
        } else {
          this.setState({
            addResourceError:
              "Invalid URL, " + this.state.addURL + " does not exist.",
          });
        }
      });
    }
  }

  render() {
    let resources = [];
    if (!this.state.dataLoaded) {
      this.loadData();
    } else {
      let info = "";
      for (let resource in this.state.resources.val()) {
        info = this.state.resources.val()[resource];
        resources.push(this.newResource(info.text, info.url, resource));
      }
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"Resources"} />
        {/*
         This view below is the main		*/}
        {this.state.dataLoaded ? (
          <ScrollView style={styles.main}>
            {/*This is the consultation button */}
            <Pressable
              style={resourcesScreenStyles.consultationContainer}
              onPress={() =>
                this.goToURL(
                  "https://missionscholarship.org/ola/services/video-chat-kyndall-program-consultation#d4f66cf5-2682-4fc6-b186-3bdfa068ece3"
                )
              }
            >
              <Ionicons
                style={resourcesScreenStyles.icon}
                name="calendar"
                size={25}
                color={"white"}
              />
              <Text style={resourcesScreenStyles.consultationText}>
                Consultation
              </Text>
            </Pressable>
            {/*Other resources*/}
            <View style={resourcesScreenStyles.resourcesContainer}>
              {resources}
            </View>
            {this.state.isAdmin && (
              <View>
                {this.state.addResource ? (
                  <View style={resourcesScreenStyles.addContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Pressable
                        onPress={() =>
                          this.setState({
                            addResource: false,
                            addText: "",
                            addURL: "",
                            addResourceError: "",
                          })
                        }
                      >
                        <Ionicons
                          style={{ marginLeft: 5, marginTop: 5 }}
                          name="close"
                          size={screenWidth * (1 / 12)}
                          color={"#B71914"}
                        ></Ionicons>
                      </Pressable>
                      <Pressable
                        style={{
                          alignSelf: "flex-end",
                          marginLeft: "auto",
                        }}
                        onPress={() => this.handleAddResource()}
                      >
                        <Ionicons
                          style={{
                            marginRight: 5,
                            marginTop: 5,
                          }}
                          name="checkmark-sharp"
                          size={screenWidth * (1 / 12)}
                          color={"#B71914"}
                        ></Ionicons>
                      </Pressable>
                    </View>
                    <TextInput
                      style={resourcesScreenStyles.addResource}
                      placeholder="Type resource name here..."
                      placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
                      selectionColor={"#B71914"}
                      value={this.state.addText}
                      onChangeText={(addText) => this.setState({ addText })}
                      label="newResourceText"
                    />
                    <TextInput
                      style={resourcesScreenStyles.addResource}
                      placeholder="Type resource URL here..."
                      placeholderTextColor={"rgba(183, 25, 20, 0.3)"}
                      selectionColor={"#B71914"}
                      value={this.state.addURL}
                      onChangeText={(addURL) => this.setState({ addURL })}
                      label="newResourceURL"
                    />
                    <Text
                      style={{
                        color: "#B71914",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {this.state.addResourceError}
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    onPress={() => this.setState({ addResource: true })}
                  >
                    <Ionicons name="add-sharp" color={"#B71914"} size={35} />
                  </Pressable>
                )}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.main}></View>
        )}
      </View>
    );
  }
}

const resourcesScreenStyles = StyleSheet.create({
  //put style here
  consultationContainer: {
    backgroundColor: "#B71914",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * (12 / 15),
  },
  consultationText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  icon: {
    alignSelf: "center",
    marginRight: 7,
  },
  resourcesContainer: {
    alignSelf: "center",
    width: screenWidth * (12 / 15),
  },
  resourceButton: {
    backgroundColor: "#B71914",
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    flexDirection: "row",
  },
  resourceButtonText: {
    color: "white",
    textAlign: "center",
    padding: "3%",
    fontSize: 16,
  },
  addContainer: {
    backgroundColor: "white",
    width: screenWidth * (12 / 15),
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    paddingBottom: 10,
    marginBottom: 20,
  },
  addResource: {
    color: "#B71914",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingBottom: 4,
    borderColor: "white",
    borderBottomColor: "#B71914",
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: "#B71914",
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
