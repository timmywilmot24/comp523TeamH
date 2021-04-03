import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
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
      isAdmin: false,
      addPost: false,
      post: "",
      deletePrompt: [],
    };
  }

  getData() {
    this.state.db
      .database()
      .ref("news")
      .get()
      .then((news) => {
        let messages = this.state.messages;
        let deletePrompt = [];
        let length = 0;
        news.forEach((post) => {
          length += 1;
          messages.push({
            date: post.val().date,
            message: post.val().message,
          });
          deletePrompt.push(false);
        });
        this.state.db
          .database()
          .ref("users/" + this.state.userID + "/account")
          .get()
          .then((data) => {
            this.setState({
              messages: messages,
              length: length,
              dataGrabbed: true,
              isAdmin: data.val() === "admin",
              deletePrompt: deletePrompt,
            });
          });
      });
  }

  addMessage() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    this.state.db
      .database()
      .ref("news/" + this.state.length)
      .set({
        message: this.state.post,
        date: mm + "/" + dd + "/" + yyyy,
      })
      .then(() => {
        this.setState({
          addPost: false,
          dataGrabbed: false,
          messages: [],
          length: 0,
          post: "",
        });
      });
  }

  handleDelete(removeEle) {
    let messages = [];
    let deletePrompt = [];
    for (let i = 0; i < this.state.messages.length; i++) {
      if (i !== removeEle) {
        messages.push(this.state.messages[i]);
        deletePrompt.push(false);
      }
    }
    this.state.db
      .database()
      .ref("news")
      .set(messages)
      .then(() => {
        this.setState({
          messages: messages,
          length: this.state.length - 1,
          deletePrompt: deletePrompt,
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
          <View key={i} style={newsScreenStyles.newsContainer}>
            <Text style={newsScreenStyles.date}>
              {this.state.messages[i].date}
            </Text>
            <Text style={newsScreenStyles.message}>
              {this.state.messages[i].message}
            </Text>
            {this.state.isAdmin && (
              <View>
                {this.state.deletePrompt[i] ? (
                  <View>
                    <Text>Are you sure you want to delete your message?</Text>
                    <Pressable onPress={() => this.handleDelete(i)}>
                      <Text>Yes</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        let prompts = this.state.deletePrompt;
                        prompts[i] = false;
                        this.setState({
                          deletePrompt: prompts,
                        });
                      }}
                    >
                      <Text>No</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <Pressable
                      onPress={() => {
                        let prompts = this.state.deletePrompt;
                        prompts[i] = true;
                        this.setState({
                          deletePrompt: prompts,
                        });
                      }}
                    >
                      <Text>Delete</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
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
          <ScrollView style={styles.main}>
            {feed}
            {this.state.isAdmin && (
              <View>
                {this.state.addPost ? (
                  <View>
                    <TextInput
                      placeholder="Type post here"
                      value={this.state.post}
                      onChangeText={(post) => this.setState({ post })}
                      label="newPost"
                    />
                    <Pressable
                      onPress={() => this.setState({ addPost: false })}
                    >
                      <Text>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={() => this.addMessage()}>
                      <Text>Send message</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <Pressable onPress={() => this.setState({ addPost: true })}>
                      <Text>Add Post</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        ) : (
          // This is before we get the data
          <View style={styles.main}></View>
        )}
      </View>
    );
  }
}

const newsScreenStyles = StyleSheet.create({
  //put newScreen style here
  newsContainer: {
    backgroundColor: "white",
  },
  date: {
    backgroundColor: "#B71914",
    color: "white",
  },
  message: {
    backgroundColor: "#B71914",
    color: "white",
  },
});
