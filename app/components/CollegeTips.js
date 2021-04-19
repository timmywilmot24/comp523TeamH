import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { styles } from '../screens/MainScreen.js';
export default class CollegeTips extends Component {
	constructor(props) {
		super(props);

		this.state = {
			college: this.props.college,
		};
	}
	render() {
		let collegeTipsRender = [];
		for (let i = 0; i < this.state.college.length; i++) {
			collegeTipsRender.push(<Text key={i}>{this.state.college[i]}</Text>);
		}
		return (
			<View>
				<Pressable onPress={() => this.props.setState(false)}>
					<Text>Back</Text>
				</Pressable>
				<ScrollView>
					<Text>College Tips</Text>
					{collegeTipsRender}
				</ScrollView>
			</View>
		);
	}
}

const collegeScreenStyles = StyleSheet.create({});
