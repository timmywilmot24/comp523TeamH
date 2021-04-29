import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
const screenWidth = Dimensions.get("window").width;

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
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

  handleEmail() {
    let to = "mscollegereadinessapp@gmail.com";
    let url = `mailto:${to}`;
    Linking.canOpenURL(url)
      .then(() => {
        Linking.openURL(url).catch(() => {
          Alert.alert("Unable to connect to email.");
        });
      })
      .catch(() => {
        Alert.alert("Unable to connect to Internet.");
      });
  }

  render() {
    return (
      <View style={styles.header}>
        <SafeAreaView style={styles.safeContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.handleEmail()}
          >
            <Ionicons
              name="mail"
              style={styles.icon}
              size={screenWidth * (1 / 14)}
              color={"white"}
            ></Ionicons>
          </TouchableOpacity>
          <Text style={styles.headerText}>{this.state.title}</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              this.goToURL(
                "https://missionscholarship.org/ola/services/video-chat-kyndall-program-consultation#d4f66cf5-2682-4fc6-b186-3bdfa068ece3"
              )
            }
          >
            <Ionicons
              style={styles.icon}
              name="calendar"
              size={screenWidth * (1 / 14)}
              color={"white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#B71914",
  },
  headerText: {
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    width: screenWidth * (12 / 14) - 10,
    textAlign: "center",
  },
  safeContainer: {
    flexDirection: "row",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 28,
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  icon: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
});
