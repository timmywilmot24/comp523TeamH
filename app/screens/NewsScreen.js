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
  Linking,
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
      url: "",
      errorMessage: "",
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
            url: post.val().url,
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
    if (this.state.post === "") {
      this.setState({ errorMessage: "Message must not be empty." });
    } else if (this.state.url !== "" && !this.state.post.includes("!URL")) {
      this.setState({
        errorMessage:
          "URL given, but needs to be placed in message with !URL token",
      });
    } else {
      Linking.canOpenURL(this.state.url).then((supported) => {
        if (supported) {
          this.state.db
            .database()
            .ref("news/" + this.state.length)
            .set({
              message: this.state.post,
              date: mm + "/" + dd + "/" + yyyy,
              url: this.state.url,
            })
            .then(() => {
              this.setState({
                addPost: false,
                dataGrabbed: false,
                messages: [],
                length: 0,
                post: "",
                url: "",
                errorMessage: "",
              });
            });
        } else {
          this.setState({
            errorMessage: "Invalid URL, cannot go to " + this.state.url,
          });
        }
      });
    }
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
      let message = "";
      for (let i = this.state.length - 1; i > -1; i--) {
        message = this.state.messages[i].message;
        messages = message.split("!URL");
        feed.push(
          // Style these as the individual messages
          <View key={i} style={newsScreenStyles.newsContainer}>
            <Text style={newsScreenStyles.date}>
              {this.state.messages[i].date}
            </Text>
            <Text style={newsScreenStyles.message}>
              {messages.length == 2 ? (
                <Text>
                  {messages[0]}
                  <Text
                    onPress={() => Linking.openURL(this.state.messages[i].url)}
                  >
                    {this.state.messages[i].url}
                  </Text>
                  {messages[1]}
                </Text>
              ) : (
                <Text>{this.state.messages[i].message}</Text>
              )}
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
                    <TextInput
                      placeholder="Type URL here"
                      value={this.state.url}
                      onChangeText={(url) => this.setState({ url })}
                      label="newURL"
                    />
                    <Pressable
                      onPress={() =>
                        this.setState({
                          addPost: false,
                          url: "",
                          errorMessage: "",
                        })
                      }
                    >
                      <Text>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={() => this.addMessage()}>
                      <Text>Send message</Text>
                    </Pressable>
                    <Text>{this.state.errorMessage}</Text>
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
