import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Linking,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
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

  //Test this out
  goToURL(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Cannot go to " + url);
      }
    });
  }

  newResource(text, url, id) {
    return (
      <Pressable key={id} onPress={() => this.goToURL(url)}>
        <Text>{text}</Text>
      </Pressable>
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
              isAdmin: admin.val() === "admin",
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
            .ref("resources/" + this.state.length)
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
              style={resourcesScreenStyles.imageCont}
              onPress={() =>
                this.goToURL(
                  "https://missionscholarship.org/ola/services/video-chat-kyndall-program-consultation#d4f66cf5-2682-4fc6-b186-3bdfa068ece3"
                )
              }
            >
              <ImageBackground
                source={require("../assets/ms-consult.png")}
                style={resourcesScreenStyles.image}
              >
                <Text>Get a consultation here</Text>
              </ImageBackground>
            </Pressable>
            {/*Other resources*/}
            <View>{resources}</View>
            {this.state.isAdmin && (
              <View>
                {this.state.addResource ? (
                  <View>
                    <TextInput
                      placeholder="Resource name here"
                      value={this.state.addText}
                      onChangeText={(addText) => this.setState({ addText })}
                      label="newResourceText"
                    />
                    <TextInput
                      placeholder="Resource URL here"
                      value={this.state.addURL}
                      onChangeText={(addURL) => this.setState({ addURL })}
                      label="newResourceURL"
                    />
                    <Text>{this.state.addResourceError}</Text>
                    <Text
                      onPress={() =>
                        this.setState({
                          addResource: false,
                          addText: "",
                          addURL: "",
                          addResourceError: "",
                        })
                      }
                    >
                      Cancel
                    </Text>
                    <Text onPress={() => this.handleAddResource()}>
                      Add new resource
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text onPress={() => this.setState({ addResource: true })}>
                      Add Resource
                    </Text>
                  </View>
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
  image: {
    width: screenWidth * (12 / 15),
    height: screenWidth * (12 / 15),
    alignItems: "center",
    justifyContent: "center",
  },
  imageCont: {
    paddingTop: "5%",
    alignItems: "center",
  },
});
