import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen.js";
import MainScreen from "./app/screens/MainScreen.js";
import RegisterScreen from "./app/screens/RegisterScreen.js";
import ResetScreen from "./app/screens/ResetScreen.js";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from "firebase";

const Stack = createStackNavigator();

// Creates firebase instance as db
const db = firebase.initializeApp({
  apiKey: "AIzaSyAf1fhK4UkxkVvpL9--RX6azwgPlrkXprI",
  authDomain: "mission-scholarship.firebaseapp.com",
  projectId: "mission-scholarship",
  storageBucket: "mission-scholarship.appspot.com",
  messagingSenderId: "646256727876",
  appId: "1:646256727876:web:f6dbc91e1d6c8971202911",
  measurementId: "G-T5B1DFVWQW",
});
// Uses a Stack Navigator to offer navigation
// between the login page, register page, reset password page, and main page
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Stack navigator with initial page as login and no header
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          // Login page that passes in our database reference
          name="Login"
          initialParams={{ firebase: db }}
          component={LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          // Reset password page that passes in our database reference
          name="Reset"
          initialParams={{ firebase: db }}
          component={ResetScreen}
        ></Stack.Screen>
        <Stack.Screen
          // Register page that passes in our database reference
          name="Register"
          initialParams={{ firebase: db }}
          component={RegisterScreen}
        ></Stack.Screen>
        <Stack.Screen
          // Main page that passes in our database reference
          name="Main"
          initialParams={{ firebase: db }}
          component={MainScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
