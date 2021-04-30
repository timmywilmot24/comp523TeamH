import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

	renderClassData(subject, year) {
		let classView = [];
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
		let apCourses = [];

		let classes = this.state.track[subject][year].classes;
		let apClasses = this.state.track[subject][year].apCourses;
		for (let type in classes) {
			let typeOfClasses = classes[type];
			if (type === 'firstSemester' || type === 'secondSemester') {
				for (let c in typeOfClasses) {
					semesterClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'electives') {
				for (let c in typeOfClasses) {
					electiveClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'electivesNotes') {
				electiveNoteRender = <Text key={'elective'}>{typeOfClasses}</Text>;
			} else if (type === 'english') {
				for (let c in typeOfClasses) {
					englishClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'englishNotes') {
				englishNoteRender = <Text key={'english'}>{typeOfClasses}</Text>;
			} else if (type === 'math') {
				for (let c in typeOfClasses) {
					mathClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'mathNotes') {
				mathNoteRender = <Text key={'math'}>{typeOfClasses}</Text>;
			} else if (type === 'science') {
				for (let c in typeOfClasses) {
					scienceClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'scienceNotes') {
				scienceNoteRender = <Text key={'science'}>{typeOfClasses}</Text>;
			} else if (type === 'socialStudies') {
				for (let c in typeOfClasses) {
					socialStudiesClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'socialStudiesNotes') {
				socialStudiesNoteRender = <Text key={'social'}>{typeOfClasses}</Text>;
			} else if (type === 'language') {
				for (let c in typeOfClasses) {
					languageClassRender.push(
						<View
							key={type + c + 'infoContainer' + year}
							style={classScreenStyles.regularTextContainer}
						>
							<Text key={type + c + 'infoText' + year}>{typeOfClasses[c]}</Text>
						</View>
					);
				}
			} else if (type === 'languageNotes') {
				if (typeOfClasses === '') {
					languageNoteRender = (
						<Text key={'None'}>
							You should be looking to finish the language requirements.
						</Text>
					);
				} else {
					languageNoteRender = <Text key={'language'}>{typeOfClasses}</Text>;
				}
			}
		}
		for (let c in apClasses) {
			apCourses.push(
				<View key={c} style={classScreenStyles.regularTextContainer}>
					<Text key={c}>{apClasses[c]}</Text>
				</View>
			);
		}
		classView = [
			<View
				key={'semesterClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'semesterClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'semesterClassIcon'}
					></Ionicons>
					<Text key={'semesterClassTitleText'} style={classScreenStyles.title}>
						First/Second Semester
					</Text>
				</View>
				{semesterClassRender}
			</View>,
			<View
				key={'electiveContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'electiveClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'electiveClassIcon'}
					></Ionicons>
					<Text key={'electiveClassTitleText'} style={classScreenStyles.title}>
						Electives
					</Text>
				</View>
				<View key={'electiveClasses' + year}>{electiveClassRender}</View>
				<View
					key={'electiveNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{electiveNoteRender}
				</View>
			</View>,
			<View
				key={'englishClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'englishClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'englishClassIcon'}
					></Ionicons>
					<Text key={'englishClassTitleText'} style={classScreenStyles.title}>
						English
					</Text>
				</View>
				<View key={'englishClasses' + year}>{englishClassRender}</View>
				<View
					key={'englishNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{englishNoteRender}
				</View>
			</View>,
			<View
				key={'mathClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'mathClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'mathClassIcon'}
					></Ionicons>
					<Text key={'mathClassTitleText'} style={classScreenStyles.title}>
						Math
					</Text>
				</View>
				<View key={'mathClasses' + year}>{mathClassRender}</View>
				<View
					key={'englishNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{mathNoteRender}
				</View>
			</View>,
			<View
				key={'scienceClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'scienceClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'scienceClassIcon'}
					></Ionicons>
					<Text key={'scienceClassTitleText'} style={classScreenStyles.title}>
						Science
					</Text>
				</View>
				<View key={'scienceClasses' + year}>{scienceClassRender}</View>
				<View
					key={'scienceNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{scienceNoteRender}
				</View>
			</View>,
			<View
				key={'socialStudiesClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'socialStudiesClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'socialStudiesClassIcon'}
					></Ionicons>
					<Text
						key={'socialStudiesClassTitleText'}
						style={classScreenStyles.title}
					>
						Social Studies
					</Text>
				</View>
				<View key={'socialStudiesClasses' + year}>
					{socialStudiesClassRender}
				</View>
				<View
					key={'socialStudiesNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{socialStudiesNoteRender}
				</View>
			</View>,
			<View
				key={'languageClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'languageClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'languageClassIcon'}
					></Ionicons>
					<Text key={'languageClassTitleText'} style={classScreenStyles.title}>
						Language
					</Text>
				</View>
				<View key={'languageClasses' + year}>{languageClassRender}</View>
				<View
					key={'languageNotes' + year}
					style={classScreenStyles.noteContainers}
				>
					{languageNoteRender}
				</View>
			</View>,
			<View
				key={'apCoursesClassContainer' + year}
				style={classScreenStyles.classTypeContainer}
			>
				<View
					key={'apClassTitleContainer' + year}
					style={classScreenStyles.classTypeTitleContainer}
				>
					<Ionicons
						style={classScreenStyles.titlesIcons}
						name="school"
						color="#B71914"
						size={35}
						key={'apClassIcon'}
					></Ionicons>
					<Text key={'apClassTitleText'} style={classScreenStyles.title}>
						AP Courses
					</Text>
				</View>
				<View key={'apClasses' + year}>{apCourses}</View>
			</View>,
		];
		return classView;
	}
	render() {
		let year = 0;

		let freshmanClassRender = [];
		let sophomoreClassRender = [];
		let juniorClassRender = [];
		let seniorClassRender = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
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
					if (year != 0) {
						freshmanClassRender = this.renderClassData(subject, year);
					} else {
						freshmanClassRender = this.renderClassData(subject, 9);
						sophomoreClassRender = this.renderClassData(subject, 10);
						juniorClassRender = this.renderClassData(subject, 11);
						seniorClassRender = this.renderClassData(subject, 12);
					}
				}
			}
		}
		return (
			<View>
				<View style={classScreenStyles.backButtonContainer}>
					<TouchableOpacity
						style={classScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={classScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={classScreenStyles.backText}>Back</Text>
					</TouchableOpacity>
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
				<View style={{ zIndex: -1 }}>
					<ScrollView>
						{this.state.year === 'All' ? (
							<View>
								<View style={classScreenStyles.classSectionTitleContainer}>
									<Text style={classScreenStyles.classSectionTitle}>
										Freshman
									</Text>
								</View>
								<View style={classScreenStyles.classSectionContainer}>
									{freshmanClassRender}
								</View>
								<View style={classScreenStyles.classSectionTitleContainer}>
									<Text style={classScreenStyles.classSectionTitle}>
										Sophomore
									</Text>
								</View>
								<View style={classScreenStyles.classSectionContainer}>
									{sophomoreClassRender}
								</View>
								<View style={classScreenStyles.classSectionTitleContainer}>
									<Text style={classScreenStyles.classSectionTitle}>
										Junior
									</Text>
								</View>
								<View style={classScreenStyles.classSectionContainer}>
									{juniorClassRender}
								</View>
								<View style={classScreenStyles.classSectionTitleContainer}>
									<Text style={classScreenStyles.classSectionTitle}>
										Senior
									</Text>
								</View>
								<View
									style={[
										classScreenStyles.classSectionContainer,
										{ marginBottom: screenWidth * 2 },
									]}
								>
									{seniorClassRender}
								</View>
							</View>
						) : (
							<View style={{ marginBottom: screenWidth * 2 }}>
								{freshmanClassRender}
							</View>
						)}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const classScreenStyles = StyleSheet.create({
	backButtonContainer: {
		backgroundColor: '#DDDDDD',
		padding: screenWidth * (1 / 50),
		marginBottom: screenWidth * (1 / 50),
		height: screenWidth * (1 / 7),
		justifyContent: 'center',
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
		alignSelf: 'center',
		width: (screenWidth * 3) / 7,
		height: 40,
		borderRadius: 20,
		zIndex: 100,
		marginVertical: screenWidth * (1 / 50),
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
	classSectionContainer: {
		marginBottom: 40,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	classSectionTitle: {
		color: '#B71914',
		fontWeight: 'bold',
		fontSize: screenWidth * (1 / 15),
		textAlign: 'center',
		marginVertical: screenWidth * (1 / 30),
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
});
