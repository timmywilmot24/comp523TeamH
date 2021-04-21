import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Dimensions,
} from 'react-native';
import { styles } from '../screens/MainScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
const screenWidth = Dimensions.get('window').width;
export default class Classes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			class: this.props.classes,
			apCourses: this.props.apCourses,
		};
	}
	render() {
		let electives = this.state.class.electives;
		let electivesRender = [];
		for (let i = 0; i < electives.length; i++) {
			electivesRender.push(
				<View style={classScreenStyles.regularTextContainer}>
					<Text key={i}>{electives[i]}</Text>
				</View>
			);
		}

		let english = this.state.class.english;
		let englishRender = [];
		for (let i = 0; i < english.length; i++) {
			englishRender.push(
				<View style={classScreenStyles.regularTextContainer}>
					<Text key={i}>{english[i]}</Text>
				</View>
			);
		}

		let languageGroupRender = [];
		let language = this.state.class.language;
		let languageRender = [];
		let languageNoteRender;
		if (language === '') {
			languageGroupRender.push(<Text key={'None'}>None</Text>);
		} else {
			for (let i = 0; i < language.length; i++) {
				languageRender.push(
					<View style={classScreenStyles.regularTextContainer}>
						<Text key={i}>{language[i]}</Text>
					</View>
				);
				languageNoteRender = (
					<View style={classScreenStyles.noteContainers}>
						<Text key={'LanguageNote'}>{this.state.class.languageNotes}</Text>
					</View>
				);
			}
			languageGroupRender.push(languageRender, languageNoteRender);
		}

		let math = this.state.class.math;
		let mathRender = [];
		for (let i = 0; i < math.length; i++) {
			mathRender.push(
				<View style={classScreenStyles.regularTextContainer}>
					<Text key={i}>{math[i]}</Text>
				</View>
			);
		}

		let science = this.state.class.science;
		let scienceRender = [];
		for (let i = 0; i < science.length; i++) {
			scienceRender.push(
				<View style={classScreenStyles.regularTextContainer}>
					<Text key={i}>{science[i]}</Text>
				</View>
			);
		}

		let socialStudies = this.state.class.socialStudies;
		let socialStudiesRender = [];
		for (let i = 0; i < socialStudies.length; i++) {
			socialStudiesRender.push(
				<View style={classScreenStyles.regularTextContainer}>
					<Text key={i}>{socialStudies[i]}</Text>
				</View>
			);
		}

		let apCoursesRender = [];
		for (let i = 0; i < this.state.apCourses.length; i++) {
			apCoursesRender.push(
				<View>
					{i === this.state.apCourses.length - 1 ? (
						<View>
							<Text key={i}>{this.state.apCourses[i]}</Text>
						</View>
					) : (
						<View style={classScreenStyles.regularTextContainer}>
							<Text key={i}>{this.state.apCourses[i]}</Text>
						</View>
					)}
				</View>
			);
		}

		let firstSemesterRender = [];
		for (let i = 0; i < this.state.class.firstSemester.length; i++) {
			firstSemesterRender.push(
				<View>
					{i === this.state.class.firstSemester.length - 1 ? (
						<View>
							<Text key={i}>{this.state.class.firstSemester[i]}</Text>
						</View>
					) : (
						<View style={classScreenStyles.regularTextContainer}>
							<Text key={i}>{this.state.class.firstSemester[i]}</Text>
						</View>
					)}
				</View>
			);
		}

		let secondSemesterRender = [];
		for (let i = 0; i < this.state.class.secondSemester.length; i++) {
			secondSemesterRender.push(
				<View>
					{i === this.state.class.secondSemester.length - 1 ? (
						<View>
							<Text key={i}>{this.state.class.secondSemester[i]}</Text>
						</View>
					) : (
						<View style={classScreenStyles.regularTextContainer}>
							<Text key={i}>{this.state.class.secondSemester[i]}</Text>
						</View>
					)}
				</View>
			);
		}
		return (
			<View>
				<View style={classScreenStyles.backButtonContainer}>
					<Pressable
						style={classScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={classScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={classScreenStyles.backText}>Back</Text>
					</Pressable>
				</View>
				<View style={{ marginBottom: screenWidth * (3 / 4) }}>
					<ScrollView>
						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>First Semester</Text>
							</View>

							{firstSemesterRender}
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Second Semester</Text>
							</View>
							{secondSemesterRender}
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Electives</Text>
							</View>
							{electivesRender}
							<View style={classScreenStyles.noteContainers}>
								<Text>{this.state.class.electivesNotes}</Text>
							</View>
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Language</Text>
							</View>
							{languageGroupRender}
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>English</Text>
							</View>
							{englishRender}
							<View style={classScreenStyles.noteContainers}>
								<Text>{this.state.class.englishNotes}</Text>
							</View>
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Math</Text>
							</View>
							{mathRender}
							<View style={classScreenStyles.noteContainers}>
								<Text>{this.state.class.mathNotes}</Text>
							</View>
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Science</Text>
							</View>
							{scienceRender}
							<View style={classScreenStyles.noteContainers}>
								<Text>{this.state.class.scienceNotes}</Text>
							</View>
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>Social Studies</Text>
							</View>
							{socialStudiesRender}
							<View style={classScreenStyles.noteContainers}>
								<Text>{this.state.class.socialStudiesNotes}</Text>
							</View>
						</View>

						<View style={classScreenStyles.containers}>
							<View style={classScreenStyles.titleContainers}>
								<Ionicons
									style={classScreenStyles.titlesIcons}
									name="school"
									color="#B71914"
									size="35"
								></Ionicons>
								<Text style={classScreenStyles.titles}>AP Courses</Text>
							</View>
							{apCoursesRender}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const classScreenStyles = StyleSheet.create({
	containers: {
		backgroundColor: 'white',
		padding: screenWidth * (1 / 25),
		width: screenWidth * (13 / 15),
		alignSelf: 'center',
		marginVertical: screenWidth * (1 / 40),
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	titleContainers: {
		flexDirection: 'row',
		paddingVertical: screenWidth * (1 / 70),
		borderRadius: screenWidth * (1 / 70),
		marginBottom: screenWidth * (1 / 25),
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	titles: {
		color: '#B71914',
		marginLeft: screenWidth * (1 / 70),
		fontSize: 20,
		alignSelf: 'center',
	},
	titlesIcons: {
		alignSelf: 'center',
	},
	regularTextContainer: {
		borderBottomColor: 'rgba(0, 0, 0, 0.2)',
		borderBottomWidth: 1,
		marginBottom: screenWidth * (1 / 30),
		paddingBottom: screenWidth * (1 / 30),
	},
	noteContainers: {
		padding: screenWidth * (1 / 25),
		width: '100%',
		alignSelf: 'center',
		marginBottom: screenWidth * (1 / 40),
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		backgroundColor: '#F6931D',
	},
	backButtonContainer: {
		backgroundColor: '#DDDDDD',
		padding: screenWidth * (1 / 50),
		marginBottom: screenWidth * (1 / 50),
	},
	buttonStuff: {
		flexDirection: 'row',
	},
	backIcon: {
		alignSelf: 'center',
	},
	backText: {
		alignSelf: 'center',
	},
});
