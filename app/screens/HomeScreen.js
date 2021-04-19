import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../components/Header.js";
import { styles } from "../screens/MainScreen.js";
import Classes from "../components/Classes.js";
import CollegeTips from "../components/CollegeTips.js";
import Extra from "../components/Extra.js";
import Tips from "../components/Tips.js";
import LoadingAnimationScreen from "../components/LoadingAnimationScreen.js";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataGrabbed: false,
      db: this.props.route.params.db,
      userID: this.props.route.params.userID,
      usersTrack: "",
      track: "",
      studentsObject: "",
      studentsArray: [],
      grade: "",
      classRender: false,
      collegeRender: false,
      extraRender: false,
      tipsRender: false,
      isAdmin: false,
      adminInput: "",
      adminGrade: 0,
    };
  }

  loadUserInfo() {
    this.state.db
      .database()
      .ref("users/" + this.state.userID)
      .get()
      .then((data) => {
        this.setState({
          usersTrack: data.val().track,
          grade: data.val().grade,
          isAdmin: data.val().account === "admin",
        });
        if (data.val().account === "admin") {
          this.loadStudents();
        } else {
          this.loadTrack();
        }
      });
  }

  loadTrack() {
    this.state.db
      .database()
      .ref("track/")
      .get()
      .then((data) => {
        this.setState({
          track: data.val(),
          dataGrabbed: true,
        });
      });
  }

  loadStudents() {
    this.state.db
      .database()
      .ref("users")
      .get()
      .then((data) => {
        this.setState({
          studentsObject: data.val(),
          dataGrabbed: true,
        });
      });
  }

  render() {
    let feed = [];
    let studentView = [];
    let items = [
      {
        label: "Business",
        value: "Business",
      },
      {
        label: "Law and Politics",
        value: "LawPolitics",
      },
      {
        label: "Theatre and Film",
        value: "Theatre",
      },
      {
        label: "Journalism",
        value: "Journalism",
      },
      {
        label: "Natural Sciences",
        value: "NaturalScience",
      },
      {
        label: "Humanities",
        value: "Humanities",
      },
      {
        label: "Technology",
        value: "Technology",
      },
      {
        label: "Medicine",
        value: "Medicine",
      },
    ];
    let screenRender = (
      <View>
        <DropDownPicker
          items={items}
          defaultValue={this.state.usersTrack}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa", width: "35%" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => {
            this.setState({
              usersTrack: item.value,
            });
          }}
        />
        {/* <View style={homeScreenStyles.profileCard}>
					<Text>Profile</Text>
				</View> */}
				<Pressable
					style={homeScreenStyles.classCard}
					onPress={() => this.setState({ classRender: true })}
				>
					<Text>Class</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.extraCard}
					onPress={() => this.setState({ extraRender: true })}
				>
					<Text>Extracurricular</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.tipsCard}
					onPress={() => this.setState({ tipsRender: true })}
				>
					<Text>Tips</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.collegeCard}
					onPress={() => this.setState({ collegeRender: true })}
				>
					<Text>College Tips</Text>
				</Pressable>
			</View>
		);
		if (!this.state.dataGrabbed) {
			this.loadUserInfo();
		} else {
			let trackInfo = [];
			for (let i = 0; i < 8; i++) {
				if (this.state.track[i].name === this.state.usersTrack) {
					trackInfo = this.state.track[i][this.state.grade];
				}
			}
			if (this.state.classRender) {
				screenRender = (
					<Classes
						classes={trackInfo.classes}
						apCourses={trackInfo.apCourses}
						setState={(classRender) => {
							this.setState({
								classRender: classRender,
							});
						}}
					></Classes>
				);
			} else if (this.state.collegeRender) {
				screenRender = (
					<CollegeTips
						college={trackInfo.college}
						setState={(collegeRender) => {
							this.setState({
								collegeRender: collegeRender,
							});
						}}
					></CollegeTips>
				);
			} else if (this.state.extraRender) {
				screenRender = (
					<Extra
						extra={trackInfo.activities}
						setState={(extraRender) => {
							this.setState({
								extraRender: extraRender,
							});
						}}
					></Extra>
				);
			} else if (this.state.tipsRender) {
				screenRender = (
					<Tips
						tips={trackInfo.tips}
						setState={(tipsRender) => {
							this.setState({
								tipsRender: tipsRender,
							});
						}}
					></Tips>
				);
			}
		}
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
        <Header title={"Dashboard"} />
        {/*
         This view below is the main		*/}
        {this.state.dataGrabbed ? (
          <View>
            {this.state.isAdmin ? (
              <ScrollView>
                <TextInput
                  placeholder={"Search for students..."}
                  value={this.state.adminInput}
                  onChangeText={(adminInput) => this.setState({ adminInput })}
                  label="Search"
                ></TextInput>
                <DropDownPicker
                  items={[
                    { value: 9, label: "9th grade" },
                    { value: 10, label: "10th grade" },
                    { value: 11, label: "11th grade" },
                    { value: 12, label: "12th grade" },
                    { value: 0, label: "All grades" },
                  ]}
                  defaultValue={this.state.adminGrade}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "#fafafa", width: "35%" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) => {
                    this.setState({
                      adminGrade: item.value,
                    });
                  }}
                />
                {studentView}
              </ScrollView>
            ) : (
              <ScrollView style={styles.main}>{screenRender}</ScrollView>
            )}
          </View>
        ) : (
          <LoadingAnimationScreen></LoadingAnimationScreen>
        )}
      </View>
    );
  }
}

const homeScreenStyles = StyleSheet.create({
  profileCard: {
    backgroundColor: "white",
  },
  classCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
  extraCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
  tipsCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
  collegeCard: {
    marginTop: 5,
    backgroundColor: "white",
  },
});
