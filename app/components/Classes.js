import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { styles } from '../screens/MainScreen.js';
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
			electivesRender.push(<Text key={i}>{electives[i]}</Text>);
		}

		let english = this.state.class.english;
		let englishRender = [];
		for (let i = 0; i < english.length; i++) {
			englishRender.push(<Text key={i}>{english[i]}</Text>);
		}

		let languageGroupRender = [];
		let language = this.state.class.language;
		let languageRender = [];
		let languageNoteRender;
		if (language === '') {
			languageGroupRender.push(<Text key={'None'}>None</Text>);
		} else {
			for (let i = 0; i < language.length; i++) {
				languageRender.push(<Text key={i}>{language[i]}</Text>);
				languageNoteRender = (
					<Text key={'LanguageNote'}>{this.state.class.languageNotes}</Text>
				);
			}
			languageGroupRender.push(languageRender, languageNoteRender);
		}

		let math = this.state.class.math;
		let mathRender = [];
		for (let i = 0; i < math.length; i++) {
			mathRender.push(<Text key={i}>{math[i]}</Text>);
		}

		let science = this.state.class.science;
		let scienceRender = [];
		for (let i = 0; i < science.length; i++) {
			scienceRender.push(<Text key={i}>{science[i]}</Text>);
		}

		let socialStudies = this.state.class.socialStudies;
		let socialStudiesRender = [];
		for (let i = 0; i < socialStudies.length; i++) {
			socialStudiesRender.push(<Text key={i}>{socialStudies[i]}</Text>);
		}

		let apCoursesRender = [];
		for (let i = 0; i < this.state.apCourses.length; i++) {
			apCoursesRender.push(<Text key={i}>{this.state.apCourses[i]}</Text>);
		}

		let firstSemesterRender = [];
		for (let i = 0; i < this.state.class.firstSemester.length; i++) {
			firstSemesterRender.push(
				<Text key={i}>{this.state.class.firstSemester[i]}</Text>
			);
		}

		let secondSemesterRender = [];
		for (let i = 0; i < this.state.class.secondSemester.length; i++) {
			secondSemesterRender.push(
				<Text key={i}>{this.state.class.secondSemester[i]}</Text>
			);
		}
		return (
			<View>
				<Pressable onPress={() => this.props.setState(false)}>
					<Text>Back</Text>
				</Pressable>
				<ScrollView>
					<Text>First Semester</Text>
					{firstSemesterRender}

					<Text>Second Semester</Text>
					{secondSemesterRender}

					<Text>Electives</Text>
					{electivesRender}
					<Text>{this.state.class.electivesNotes}</Text>

					<Text>English</Text>
					{englishRender}
					<Text>{this.state.class.englishNotes}</Text>

					<Text>Language</Text>
					{languageGroupRender}

					<Text>Math</Text>
					{mathRender}
					<Text>{this.state.class.mathNotes}</Text>

					<Text>Science</Text>
					{scienceRender}
					<Text>{this.state.class.scienceNotes}</Text>

					<Text>Social Studies</Text>
					{socialStudiesRender}
					<Text>{this.state.class.socialStudiesNotes}</Text>

					<Text>AP Courses</Text>
					{apCoursesRender}
				</ScrollView>
			</View>
		);
	}
}

const classScreenStyles = StyleSheet.create({});
