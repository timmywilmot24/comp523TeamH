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
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
const screenWidth = Dimensions.get("window").width;

export default class ResourceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  newResource(text, url) {
    return (
      <Pressable onPress={() => this.goToURL(url)}>
        <Text>{text}</Text>
      </Pressable>
    );
  }
  render() {
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"Resources"} />
        {/*
         This view below is the main		*/}
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
          {/*Other helpful links */}
          {this.newResource(
            "College Readiness",
            "https://missionscholarship.org/college-readiness"
          )}
          {this.newResource(
            "Derivating from the Norm",
            "https://missionscholarship.org/deviating-from-the-norm"
          )}
          {this.newResource(
            "Preserve the Pockets",
            "https://missionscholarship.org/preserve-the-pockets-1"
          )}
          {this.newResource(
            "The Scholarship Hub",
            "https://missionscholarship.org/the-scholarship-hub"
          )}
          {this.newResource(
            "Outreach Events",
            "https://missionscholarship.org/outreach-events"
          )}
          {this.newResource(
            "Other Helpful Links",
            "https://missionscholarship.org/useful-links"
          )}
          {this.newResource(
            "Contact us",
            "https://missionscholarship.org/#d4f66cf5-2682-4fc6-b186-3bdfa068ece3"
          )}
        </ScrollView>
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
