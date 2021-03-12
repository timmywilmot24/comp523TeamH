import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./HomeScreen.js";
import ResourceScreen from "./ResourceScreen.js";
import QuizScreen from "./QuizScreen.js";
import NewsScreen from "./NewsScreen.js";
import SettingsScreen from "./SettingsScreen.js";

const HomeStack = createStackNavigator();

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <NavigationContainer independent={true}>
        <HomeStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
          ></HomeStack.Screen>
          <HomeStack.Screen
            name="Resource"
            component={ResourceScreen}
          ></HomeStack.Screen>
          <HomeStack.Screen
            name="Quiz"
            component={QuizScreen}
          ></HomeStack.Screen>
          <HomeStack.Screen
            name="News"
            component={NewsScreen}
          ></HomeStack.Screen>
          <HomeStack.Screen
            name="Settings"
            component={SettingsScreen}
          ></HomeStack.Screen>
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
