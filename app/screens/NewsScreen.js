import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
export default class NewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      messages: [],
      dataGrabbed: false,
      length: 0,
    };
  }

  getData() {
    this.state.db
      .database()
      .ref("news")
      .get()
      .then((news) => {
        let messages = this.state.messages;
        let length = 0;
        news.forEach((post) => {
          length += 1;
          messages.push({
            date: post.val().date,
            message: post.val().message,
          });
        });
        this.setState({
          messages: messages,
          length: length,
          dataGrabbed: true,
        });
      });
  }

  render() {
    let feed = [];
    if (!this.state.dataGrabbed) {
      this.getData();
    } else {
      for (let i = this.state.length - 1; i > -1; i--) {
        feed.push(
          // Style these as the individual messages
          <View key={i}>
            <Text>{this.state.messages[i].date}</Text>
            <Text>{this.state.messages[i].message}</Text>
          </View>
        );
      }
    }
    return (
      <View style={styles.body}>
        {/*
         This view below is the header		*/}
        <Header title={"News"} />

        {/*
         This view below is the main		*/}
        {this.state.dataGrabbed ? (
          // This is when the data is received
          <ScrollView style={styles.main}>{feed}</ScrollView>
        ) : (
          // This is before we get the data
          <View style={styles.main}></View>
        )}
      </View>
    );
  }
}

const newScreenStyles = StyleSheet.create({
  //put newScreen style here
});
