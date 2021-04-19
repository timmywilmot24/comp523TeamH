import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataGrabbed: false,
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
    };
  }

  loadUserInfo() {
    this.state.db
      .database()
      .ref("users/" + this.state.userID)
      .get()
      .then((data) => {
        console.log(data);
        this.setState({
          dataGrabbed: true,
        });
      });
  }
  render() {
    let feed = [];
    if (!this.state.dataGrabbed) {
      this.loadUserInfo();
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"Dashboard"} />
        {/*
         This view below is the main		*/}
        <ScrollView style={styles.main}>
          <View style={homeScreenStyles.profileCard}>
            <Text>Profile</Text>
          </View>
          <View style={homeScreenStyles.classCard}>
            <Text>Class</Text>
          </View>
          <View style={homeScreenStyles.extraCard}>
            <Text>Extracurricular</Text>
          </View>
          <View style={homeScreenStyles.tipsCard}>
            <Text>Tips</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const homeScreenStyles = StyleSheet.create({
  profileCard: {
    backgroundColor: "white",
  },
  classCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
  extraCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
  tipsCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
});
