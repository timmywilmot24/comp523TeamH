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
		return (
			<View>
				<Pressable onPress={() => this.props.setState(false)}>
					<Text>Back</Text>
				</Pressable>
			</View>
		);
	}
}

const collegeScreenStyles = StyleSheet.create({});
