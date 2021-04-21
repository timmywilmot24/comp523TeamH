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
				<View style={collegeScreenStyles.backButtonContainer}>
					<Pressable
						style={collegeScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={collegeScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={collegeScreenStyles.backText}>Back</Text>
					</Pressable>
				</View>
				<View>
					<ScrollView>
						<Text>College Tips</Text>
						{collegeTipsRender}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const collegeScreenStyles = StyleSheet.create({
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
