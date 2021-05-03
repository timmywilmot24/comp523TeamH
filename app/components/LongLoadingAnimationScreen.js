import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import Ionicons from "react-native-vector-icons/Ionicons";

export default class LongLoadingAnimationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View>
        {!this.props.dataLoaded ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: screenHeight,
            }}
          >
            <ActivityIndicator
              size="large"
              color="#B71914"
              style={{ zIndex: -1, position: "absolute", top: 80 }}
            />
            <View style={{ zIndex: -1, position: "absolute", top: 130 }}>
              <Text style={{ color: "#B71914", opacity: 0.5 }}>
                Hang tight. We're almost done
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: screenWidth * 0.05,
                backgroundColor: "#B71914",
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                    width: screenWidth * 0.6,
                    marginBottom: 5,
                  }}
                >
                  Ask Mission Scholarship
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    width: screenWidth * 0.6,
                  }}
                >
                  Have a question? Email us and we will get back to you!
                </Text>
              </View>
              <View
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="mail"
                  size={screenWidth * (1 / 8)}
                  color={"white"}
                ></Ionicons>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: screenWidth * 0.05,
                backgroundColor: "#B71914",
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 20,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="calendar"
                  size={screenWidth * (1 / 8)}
                  color={"white"}
                ></Ionicons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                    width: screenWidth * 0.6,
                    marginBottom: 5,
                    textAlign: "right",
                  }}
                >
                  Schedule a Consulation
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    width: screenWidth * 0.6,
                    textAlign: "right",
                  }}
                >
                  Wanna talk to an expert? Schedule a consulation with us. The
                  first one is free.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: (screenWidth * 1) / 10,
              width: (screenWidth * 6) / 14,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Ionicons
              name="wifi"
              size={screenWidth * (6 / 14)}
              color={"#B71914"}
              style={{ marginTop: (screenWidth * 3) / 14 }}
            ></Ionicons>
            <Text
              style={{ color: "#B71914", fontSize: 14, textAlign: "center" }}
            >
              Currently offline
            </Text>
          </View>
        )}
      </View>
    );
  }
}
