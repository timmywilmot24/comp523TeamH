import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class IGRotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: this.props.responses,
      index: 0,
    };
  }

  renderSubjects() {
    let subjects1 = [];
    let subjects2 = [];
    for (
      let i = 0;
      i < this.state.responses[this.state.index].subject.length;
      i++
    ) {
      if (i % 2 === 0) {
        subjects1.push(
          <Text
            key={i}
            style={{ fontSize: 14, color: "#B71914", marginVertical: 2 }}
          >
            • {this.state.responses[this.state.index].subject[i]}
          </Text>
        );
      } else {
        subjects2.push(
          <Text
            key={i}
            style={{ fontSize: 14, color: "#B71914", marginVertical: 2 }}
          >
            • {this.state.responses[this.state.index].subject[i]}
          </Text>
        );
      }
    }
    return [
      <View>{subjects1}</View>,
      <View style={{ marginLeft: 10 }}>{subjects2}</View>,
    ];
  }
  handleDeleteResponse() {
    let responses = this.state.responses;
    responses.splice(this.state.index, 1);
    if (this.state.index > 0) {
      this.setState({
        responses: responses,
        index: this.state.index - 1,
      });
    } else {
      this.setState({
        responses: responses,
        index: this.state.index + 1,
      });
    }
    this.props.setState(responses);
  }

  render() {
    let subjects = this.renderSubjects();
    return (
      <View
        style={{
          width: 250,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
        }}
      >
        <ImageBackground
          style={{ width: 250, height: 250 }}
          source={{ uri: this.state.responses[this.state.index].pic }}
        >
          <Pressable
            onPress={() => this.handleDeleteResponse()}
            style={{ marginRight: 5, marginLeft: "auto", marginTop: 5 }}
          >
            <Ionicons name="close" color={"white"} size={40}></Ionicons>
          </Pressable>
          <View style={{ flexDirection: "row" }}>
            {this.state.index !== 0 && (
              <Pressable
                onPress={() => this.setState({ index: this.state.index - 1 })}
                style={{ marginLeft: 5, marginRight: "auto", marginTop: 60 }}
              >
                <Ionicons
                  name="chevron-back"
                  color={"white"}
                  size={40}
                ></Ionicons>
              </Pressable>
            )}
            {this.state.index !== this.state.responses.length - 1 && (
              <Pressable
                onPress={() => this.setState({ index: this.state.index + 1 })}
                style={{ marginRight: 5, marginLeft: "auto", marginTop: 60 }}
              >
                <Ionicons
                  name="chevron-forward"
                  color={"white"}
                  size={40}
                ></Ionicons>
              </Pressable>
            )}
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 16,
            color: "#B71914",
            marginVertical: 5,
            marginLeft: 10,
          }}
        >
          {this.state.responses[this.state.index].action}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#B71914",
            marginVertical: 5,
            marginLeft: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Subjects
        </Text>
        <View
          style={{
            width: 250,
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "row",
          }}
        >
          {subjects[0]}
          {subjects[1]}
        </View>
      </View>
    );
  }
}
