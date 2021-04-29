import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TabYear from '../components/TabYear.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get('window').width;
export default class Classes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			track: '',
			year: 'All',
			subject: 'Business',
		};
	}

	loadData() {
		const path = `${FileSystem.cacheDirectory}track`;
		FileSystem.readAsStringAsync(path).then((data) => {
			this.setState({ track: JSON.parse(data), dataLoaded: true });
		});
	}
	render() {
		let year = 0;
		let semesterClassRender = [];
		let electiveClassRender = [];
		let electiveNoteRender = '';
		let englishClassRender = [];
		let englishNoteRender = '';
		let mathClassRender = [];
		let mathNoteRender = '';
		let scienceClassRender = [];
		let scienceNoteRender = '';
		let socialStudiesClassRender = [];
		let socialStudiesNoteRender = '';
		let languageClassRender = [];
		let languageNoteRender = '';

		let freshmanClassRender = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let classes = '';
			year = this.state.year;
			switch (year) {
				case 'Freshman':
					year = 9;
					break;
				case 'Sophomore':
					year = 10;
					break;
				case 'Junior':
					year = 11;
					break;
				case 'Senior':
					year = 12;
					break;
				default:
					year = 0;
					break;
			}
			for (let subject in this.state.track) {
				if (this.state.track[subject].name === this.state.subject) {
					if (year == 0) {
						classes = this.state.track[subject];
						//console.log(classes);
						for (let grade in classes) {
							classes = this.state.track[subject][grade].classes;
							if (grade != 'name') {
								if (grade == 9) {
									console.log(classes);
								} else if (grade == 10) {
									//console.log(classes);
								} else if (grade == 11) {
									//console.log(classes);
								} else if (grade == 12) {
									//console.log(classes);
								}
							}
						}
					} else {
						classes = this.state.track[subject][year].classes;
						for (let type in classes) {
							let typeOfClasses = classes[type];
							if (type === 'firstSemester' || type === 'secondSemester') {
								for (let c in typeOfClasses) {
									semesterClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'electives') {
								for (let c in typeOfClasses) {
									electiveClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'electivesNotes') {
								electiveNoteRender = typeOfClasses;
							} else if (type === 'english') {
								for (let c in typeOfClasses) {
									englishClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'englishNotes') {
								englishNoteRender = typeOfClasses;
							} else if (type === 'math') {
								for (let c in typeOfClasses) {
									mathClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'mathNotes') {
								mathNoteRender = typeOfClasses;
							} else if (type === 'science') {
								for (let c in typeOfClasses) {
									scienceClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'scienceNotes') {
								scienceNoteRender = typeOfClasses;
							} else if (type === 'socialStudies') {
								for (let c in typeOfClasses) {
									socialStudiesClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'socialStudiesNotes') {
								socialStudiesNoteRender = typeOfClasses;
							} else if (type === 'language') {
								for (let c in typeOfClasses) {
									languageClassRender.push(
										<View
											key={type + c + 'infoContainer'}
											style={classScreenStyles.regularTextContainer}
										>
											<Text key={type + c + 'infoText'}>
												{typeOfClasses[c]}
											</Text>
										</View>
									);
								}
							} else if (type === 'languageNotes') {
								languageNoteRender = typeOfClasses;
							}
						}
					}
				}
			}
			freshmanClassRender.push(semesterClassRender);
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
				<View>
					<TabYear
						setState={(value) => this.setState({ year: value })}
					></TabYear>
					<DropDownPicker
						items={[
							{ value: 'Business', label: 'Business' },
							{ value: 'LawPolitics', label: 'Law and Politics' },
							{ value: 'Theatre', label: 'Theatre and Film' },
							{ value: 'Journalism', label: 'Journalism' },
							{ value: 'NaturalScience', label: 'Natural Sciences' },
							{ value: 'Humanities', label: 'Humanities' },
							{ value: 'Technology', label: 'Technology' },
							{ value: 'Medicine', label: 'Medicine' },
						]}
						defaultValue={this.state.subject}
						containerStyle={classScreenStyles.dropDown}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						onChangeItem={(item) => {
							this.setState({
								subject: item.value,
							});
						}}
					/>
				</View>
				<ScrollView>
					{this.state.year === 'All' ? (
						<View>
							<ScrollView>{freshmanClassRender}</ScrollView>
						</View>
					) : (
						<View style={{ marginBottom: screenWidth * 1.3 }}>
							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>
										1st and 2nd Semester
									</Text>
								</View>
								{semesterClassRender}
							</View>

							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>Electives</Text>
								</View>
								<View>{electiveClassRender}</View>
								<View style={classScreenStyles.noteContainers}>
									<Text>{electiveNoteRender}</Text>
								</View>
							</View>
							{languageNoteRender === '' ? (
								<View style={classScreenStyles.classTypeContainer}>
									<View style={classScreenStyles.classTypeTitleContainer}>
										<Ionicons
											style={classScreenStyles.titlesIcons}
											name="school"
											color="#B71914"
											size={35}
										></Ionicons>
										<Text style={classScreenStyles.title}>Language</Text>
									</View>
									<View>
										<Text>None</Text>
									</View>
								</View>
							) : (
								<View style={classScreenStyles.classTypeContainer}>
									<View style={classScreenStyles.classTypeTitleContainer}>
										<Ionicons
											style={classScreenStyles.titlesIcons}
											name="school"
											color="#B71914"
											size={35}
										></Ionicons>
										<Text style={classScreenStyles.title}>Language</Text>
									</View>
									<View>{languageClassRender}</View>
									<View style={classScreenStyles.noteContainers}>
										<Text>{languageNoteRender}</Text>
									</View>
								</View>
							)}

							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>English</Text>
								</View>
								<View>{englishClassRender}</View>
								<View style={classScreenStyles.noteContainers}>
									<Text>{englishNoteRender}</Text>
								</View>
							</View>

							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>Math</Text>
								</View>
								<View>{mathClassRender}</View>
								<View style={classScreenStyles.noteContainers}>
									<Text>{mathNoteRender}</Text>
								</View>
							</View>

							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>Science</Text>
								</View>
								<View>{scienceClassRender}</View>
								<View style={classScreenStyles.noteContainers}>
									<Text>{scienceNoteRender}</Text>
								</View>
							</View>

							<View style={classScreenStyles.classTypeContainer}>
								<View style={classScreenStyles.classTypeTitleContainer}>
									<Ionicons
										style={classScreenStyles.titlesIcons}
										name="school"
										color="#B71914"
										size={35}
									></Ionicons>
									<Text style={classScreenStyles.title}>Social Studies</Text>
								</View>
								<View>{socialStudiesClassRender}</View>
								<View style={classScreenStyles.noteContainers}>
									<Text>{socialStudiesNoteRender}</Text>
								</View>
							</View>
						</View>
					)}
				</ScrollView>
			</View>
		);
	}
}

const classScreenStyles = StyleSheet.create({
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
	dropDown: {
		marginRight: (screenWidth * 1) / 30,
		width: (screenWidth * 3) / 10,
		height: 40,
		borderRadius: 20,
		zIndex: 100,
	},
	classTypeContainer: {
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
	classTypeTitleContainer: {
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
	title: {
		color: '#B71914',
		marginLeft: screenWidth * (1 / 70),
		fontSize: 20,
		alignSelf: 'center',
	},
	titleIcon: {
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
});
