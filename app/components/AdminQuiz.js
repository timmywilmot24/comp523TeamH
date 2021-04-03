import React, { Component } from "react";
import {
  Text,
  Alert,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
const screenWidth = Dimensions.get("window").width;
import DropDownPicker from "react-native-dropdown-picker";

export default class AdminQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      quiz: 0,
      question: 1,
    };
  }

  loadData() {
    this.props.db
      .database()
      .ref("quiz")
      .get()
      .then((quiz) => {
        this.setState({
          dataLoaded: true,
          quiz: quiz,
        });
      });
  }
  render() {
    let items = [];
    let responses = [];
    if (!this.state.dataLoaded) {
      this.loadData();
    } else {
      for (let i = 0; i < this.state.quiz.val().numberOfQuestions; i++) {
        let value = i + 1;
        items.push({
          label: "Question " + value,
          value: value,
        });
      }
      this.state.quiz
        .val()
        .categoryQuestions[this.state.question - 1].responses.forEach(
          (response) => {
            responses.push({
              action: response.action,
              pic: response.pic,
              subjects: response.subject,
            });
          }
        );
    }
    return (
      <ScrollView>
        {this.state.dataLoaded && (
          <View style={{ alignItems: "center" }}>
            <DropDownPicker
              items={items}
              defaultValue={this.state.question}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: "#fafafa", width: "35%" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.setState({
                  question: item.value,
                })
              }
            />
            <FlatGrid
              onEndReachedThreshold={0.5}
              itemDimension={screenWidth * (1 / 3)}
              data={responses}
              renderItem={({ item }) => (
                <View>
                  <ImageBackground
                    style={styles.responseImage}
                    source={{
                      uri: item.pic,
                    }}
                  >
                    <Text style={styles.action}>{item.action}</Text>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  responseImage: {
    width: screenWidth * (7 / 15),
    height: screenWidth * (1 / 2),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  action: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
});
