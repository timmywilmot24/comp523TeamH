import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Look at Settings Screen</Text>
        <Text
          style={styles.home}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          Home
        </Text>
        <Text
          style={styles.resource}
          onPress={() => this.props.navigation.navigate("Resource")}
        >
          Resources
        </Text>
        <Text
          style={styles.quiz}
          onPress={() => this.props.navigation.navigate("Quiz")}
        >
          Quiz
        </Text>
        <Text
          style={styles.news}
          onPress={() => this.props.navigation.navigate("News")}
        >
          News
        </Text>
        <Text
          style={styles.settings}
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          Settings
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    color: "aqua",
    flex: 1,
  },
  news: {
    color: "crimson",
    flex: 1,
  },
  quiz: {
    color: "lawngreen",
    flex: 1,
  },
  resource: {
    color: "royalblue",
    flex: 1,
  },
  settings: {
    color: "yellow",
    flex: 1,
  },
});
