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
      text: "",
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
            text: post.val().text,
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
              text: this.state.text,
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
                text: "",
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
            <Text style={newsScreenStyles.message}>
              {messages.length == 2 ? (
                <Text>
                  {messages[0]}
                  <Text
                    onPress={() => Linking.openURL(this.state.messages[i].url)}
                  >
                    {this.state.messages[i].text === ""
                      ? this.state.messages[i].url
                      : this.state.messages[i].text}
                  </Text>
                  {messages[1]}
                </Text>
              ) : (
                <Text>{this.state.messages[i].message}</Text>
              )}
            </Text>
            <Text style={newsScreenStyles.date}>
              Posted on {this.state.messages[i].date}
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
                    <TextInput
                      placeholder="Optional URL text here"
                      value={this.state.text}
                      onChangeText={(text) => this.setState({ text })}
                      label="newURLText"
                    />
                    <Pressable
                      onPress={() =>
                        this.setState({
                          addPost: false,
                          post: "",
                          url: "",
                          text: "",
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
            {feed}
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
    backgroundColor: "#F4F5F7",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    borderBottomColor: "rgba(183, 25, 20, 0.3)",
    borderBottomWidth: 1,
  },
  date: {
    backgroundColor: "#F4F5F7",
    color: "#B71914",
    marginBottom: 10,
    marginLeft: 10,
    opacity: 0.7,
    fontWeight: "300",
    fontSize: 14,
  },
  message: {
    backgroundColor: "#F4F5F7",
    color: "#B71914",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
