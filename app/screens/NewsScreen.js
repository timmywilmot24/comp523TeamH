import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
        <View style={styles.header}>
          <SafeAreaView>
            <Text style={styles.headerText}>News</Text>
          </SafeAreaView>
        </View>
        {/*
         This view below is the main		*/}
        {this.state.dataGrabbed ? (
          // This is when the data is received
          <View style={styles.main}>{feed}</View>
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
