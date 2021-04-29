import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  PixelRatio,
  LogBox,
  ScrollView,
} from "react-native";
import HorizontalBarGraph from "@chartiful/react-native-horizontal-bar-graph";
import Header from "../components/Header.js";
import QuizForm from "../components/QuizForm";
import AdminQuiz from "../components/AdminQuiz";
import { styles } from "../screens/MainScreen.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";
import NetInfo from "@react-native-community/netinfo";

const screenWidth = Dimensions.get("window").width;
export default class QuizScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: false,
      dataLoaded: false,
      quizView: false,
      takenQuiz: false,
      isAdmin: false,
      track: "",
      Business: 0,
      Humanities: 0,
      Journalism: 0,
      LawPolitics: 0,
      Medicine: 0,
      NaturalScience: 0,
      Technology: 0,
      Theatre: 0,
    };
  }
  async loadData() {
    let online = await NetInfo.fetch();
    let connected = online.isConnected;
    let db = this.props.route.params.db;
    if (connected) {
      db.database()
        .ref("users/" + this.props.route.params.userID)
        .get()
        .then((result) => {
          if (result.val().quizResult !== 0) {
            let track = result.val().track;
            if (track === "LawPolitics") {
              track = "Law and Politics";
            }
            if (track === "Theatre") {
              track = "Theatre and Film";
            }
            if (track === "NaturalScience") {
              track = "Natural Sciences";
            }
            this.setState({
              online: true,
              takenQuiz: true,
              dataLoaded: true,
              Business: result.val().quizResult.Business,
              Humanities: result.val().quizResult.Humanities,
              Journalism: result.val().quizResult.Journalism,
              LawPolitics: result.val().quizResult.LawPolitics,
              Medicine: result.val().quizResult.Medicine,
              NaturalScience: result.val().quizResult.NaturalScience,
              Technology: result.val().quizResult.Technology,
              Theatre: result.val().quizResult.Theatre,
              isAdmin:
                result.val().account === "admin" ||
                result.val().account === "masterAdmin",
              track: track,
            });
          } else {
            this.setState({
              dataLoaded: true,
            });
          }
        });
    } else {
      this.setState({ dataLoaded: true });
    }
  }

  componentDidMount() {
    LogBox.ignoreLogs(["Failed prop type"]);
  }
  render() {
    if (!this.state.dataLoaded) {
      this.loadData();
    }
    return (
      <View style={styles.body}>
        <Header title={"Quiz"} />
        {this.state.dataLoaded && this.state.online ? (
          <ScrollView>
            {!this.state.isAdmin ? (
              // Regular view for non admins
              <View>
                {this.state.takenQuiz ? (
                  <View style={quizResultStyles.main}>
                    {/* If they've taken the quiz, show their results via a bar graph */}
                    <View>
                      <Text style={quizResultStyles.interest}>
                        Your Highest Interest: {this.state.track}
                      </Text>
                    </View>
                    <View style={quizResultStyles.resultContainer}>
                      <Text style={quizResultStyles.resultText}>Results</Text>
                    </View>
                    <View style={quizResultStyles.barGraphContainer}>
                      <HorizontalBarGraph
                        barWidthPercentage={0.6}
                        style={quizResultStyles.barGraph}
                        data={[
                          this.state.Business,
                          this.state.Humanities,
                          this.state.Journalism,
                          this.state.LawPolitics,
                          this.state.Medicine,
                          this.state.NaturalScience,
                          this.state.Technology,
                          this.state.Theatre,
                        ]}
                        labels={[
                          "Business",
                          "Humanities",
                          "Journalism",
                          "Politics",
                          "Medicine",
                          "Science",
                          "Technology",
                          "Theatre",
                        ]}
                        barColor={"#B71914"}
                        barRadius={5}
                        width={screenWidth * (18 / 20)}
                        height={(screenWidth * 18) / 20}
                        baseConfig={{
                          hasYAxisBackgroundLines: false,
                          xAxisLabelStyle: {
                            fontSize: 8,
                            fontWeight: "bold",
                            yOffset: 4, //subject label up and down value
                            xOffset: screenWidth * -(1.25 / 30),
                            color: "white",
                            //rotation: 45,
                          },
                          yAxisLabelStyle: {
                            fontSize: 14,
                            position: "bottom",
                            decimals: 1,
                            color: "white",
                          },
                        }}
                      />
                    </View>
                    <View>
                      {/*Retake the quiz if you want to*/}
                      <Pressable
                        style={quizResultStyles.retakeButton}
                        onPress={() => {
                          this.setState({
                            takenQuiz: false,
                            quizView: true,
                          });
                        }}
                      >
                        <Text style={quizResultStyles.retakeButtonText}>
                          Take the quiz again
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  //If you haven't yet taken a quiz...
                  <View>
                    {this.state.quizView ? (
                      // If they want to take the quiz, go to quiz form
                      <QuizForm
                        question={0}
                        firebase={this.props.route.params.db}
                        userID={this.props.route.params.userID}
                        setState={(takenQuiz, quizView, dataLoaded) => {
                          this.setState({
                            takenQuiz: takenQuiz,
                            quizView: quizView,
                            dataLoaded: dataLoaded,
                          });
                        }}
                      />
                    ) : (
                      // Otherwise, this is starting quiz screen for no quiz yet
                      <View style={quizScreenStyles.card}>
                        <View style={quizScreenStyles.intro}>
                          <Text style={quizScreenStyles.introText}>
                            What should you do in high school to prepare for
                            college based on your interests? Take the quiz to
                            find out.
                          </Text>
                        </View>
                        <View style={quizScreenStyles.buttonSec}>
                          <Image
                            source={require("../assets/grad.png")}
                            style={quizScreenStyles.pic}
                          />
                          <Pressable
                            style={quizScreenStyles.takeQuizButton}
                            onPress={() =>
                              this.setState({
                                quizView: true,
                              })
                            }
                          >
                            <Text style={quizScreenStyles.buttonText}>
                              Take the Quiz!
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : (
              // This is what happens if the admin wants to look at/edit quiz
              <AdminQuiz db={this.props.route.params.db}></AdminQuiz>
            )}
          </ScrollView>
        ) : (
          <LoadingAnimationScreen
            online={this.state.online}
            dataLoaded={this.state.dataLoaded}
          ></LoadingAnimationScreen>
        )}
      </View>
    );
  }
}

const quizScreenStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 410,
    width: "90%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,

    marginRight: "5%",
    marginLeft: "5%",
    marginTop: "25%",
  },
  intro: {
    backgroundColor: "#B71914",
    width: "90%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    marginRight: "5%",
    marginLeft: "5%",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  introText: {
    color: "white",
    fontSize: 16,
  },
  buttonSec: {
    backgroundColor: "white",
    width: "90%",
    height: 215,
    marginRight: "5%",
    marginLeft: "5%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  pic: {
    width: "100%",
    height: 215,
    borderRadius: 5,
  },
  takeQuizButton: {
    backgroundColor: "#B71914",
    zIndex: 1,
    position: "absolute",
    width: "60%",
    height: 60,
    opacity: 0.9,
    borderRadius: 10,
    top: 77,
    left: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    textAlign: "center",
    marginTop: "8%",
    fontWeight: "bold",
  },
});

const quizResultStyles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  resultContainer: {
    backgroundColor: "#DC8B89",
    width: (screenWidth * 19) / 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  resultText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: (screenWidth * 1) / 30,
    marginBottom: (screenWidth * 1) / 30,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  retakeButton: {
    backgroundColor: "#B71914",
    width: screenWidth * (11 / 12),
    height: screenWidth * (1 / 8),
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: screenWidth * (1 / 20),
  },
  retakeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  barGraphContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DC8B89",
    width: (screenWidth * 19) / 20,
    height: (screenWidth * 19) / 20,
    marginBottom: (screenWidth * 1) / 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  barGraph: {
    backgroundColor: "#DC8B89",
  },
  interest: {
    color: "#B71914",
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
});
