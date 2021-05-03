import React, { Component, useRef, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        // ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F5F7" }}>
        <FadeInView style={{ opacity: this.state.fadeValue }}>
          <View style={splash.logo}>
            <Image
              imageStyle={{ borderRadius: 75 / 2 }}
              style={{ width: "100%", height: "80%" }}
              source={require("../assets/logo.png")}
            />
          </View>
        </FadeInView>
      </SafeAreaView>
    );
  }
}

const splash = StyleSheet.create({
  logo: {
    marginTop: "5%",
    paddingVertical: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: (screenHeight * 1) / 3,
    width: "100%",
    borderRadius: 20,
    // borderWidth: 5,
    // borderColor: "white",
    backgroundColor: "#F4F5F7",
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
  },
});
