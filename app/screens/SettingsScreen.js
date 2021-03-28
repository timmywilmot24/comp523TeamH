import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
	SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';

export default class SettingsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			db: this.props.route.params.db,
			userID: this.props.route.params.userID,
			dataGrabbed: false,
			firstName: '',
			newFirstName: '',
			lastName: '',
			newLastName: '',
			grade: 0,
			newGrade: 0,
			highSchool: '',
			newHighSchool: '',
			edit: false,
		};
	}

	getData() {
		this.state.db
			.database()
			.ref('users/' + this.state.userID)
			.get()
			.then((data) => {
				data = data.val();
				this.setState({
					firstName: data.firstName,
					lastName: data.lastName,
					grade: data.grade,
					highSchool: data.highSchool,
					newFirstName: data.firstName,
					newLastName: data.lastName,
					newGrade: data.grade,
					newHighSchool: data.highSchool,
					dataGrabbed: true,
				});
			});
	}

	handleSubmit() {
		this.state.db
			.database()
			.ref('users/' + this.state.userID)
			.update({
				firstName: this.state.newFirstName,
				lastName: this.state.newLastName,
				grade: this.state.newGrade,
				highSchool: this.state.newHighSchool,
			});
		this.setState({
			firstName: this.state.newFirstName,
			lastName: this.state.newLastName,
			grade: this.state.newGrade,
			highSchool: this.state.newHighSchool,
			edit: false,
		});
	}

	render() {
		if (!this.state.dataGrabbed) {
			this.getData();
		}
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'Setting'} />
				{/*
         This view below is the main		*/}
				{this.state.dataGrabbed ? (
					// This is when the data is received
					<ScrollView style={styles.main}>
						{this.state.edit ? (
							<View style={styles.main}>
								<Text>First Name: </Text>
								<TextInput
									style={settingScreenStyles.inputs}
									placeholder={this.state.firstName}
									value={this.state.newFirstName}
									onChangeText={(newFirstName) =>
										this.setState({ newFirstName })
									}
									label="First Name"
								/>
								<Text>Last Name: </Text>
								<TextInput
									style={settingScreenStyles.inputs}
									placeholder={this.state.lastName}
									value={this.state.newLastName}
									onChangeText={(newLastName) => this.setState({ newLastName })}
									label="Last Name"
								/>
								<Text>High School: </Text>
								<TextInput
									style={styles.inputs}
									placeholder={this.state.highSchool}
									value={this.state.newHighSchool}
									onChangeText={(newHighSchool) =>
										this.setState({ newHighSchool })
									}
									label="High School"
								/>
								<Text>Grade: </Text>
								<TextInput
									style={settingScreenStyles.inputs}
									placeholder={this.state.grade}
									value={this.state.newGrade}
									onChangeText={(newGrade) => this.setState({ newGrade })}
									label="Grade"
								/>
								<Pressable
									onPress={() =>
										this.setState({
											newFirstName: this.state.firstName,
											newLastName: this.state.lastName,
											newHighSchool: this.state.highSchool,
											newGrade: this.state.grade,
											edit: false,
										})
									}
								>
									<Text>Cancel</Text>
								</Pressable>
								<Pressable onPress={() => this.handleSubmit()}>
									<Text>Submit</Text>
								</Pressable>
							</View>
						) : (
							<View style={styles.main}>
								<Text>First Name: {this.state.firstName}</Text>
								<Text>Last Name: {this.state.lastName}</Text>
								<Text>Grade: {this.state.grade}</Text>
								<Text>High School: {this.state.highSchool}</Text>
								<Pressable onPress={() => this.setState({ edit: true })}>
									<Text>Edit</Text>
								</Pressable>
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

const settingsScreenStyles = StyleSheet.create({
	inputs: {
		backgroundColor: 'white',
		marginBottom: 20,
		fontSize: 18,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},
});
