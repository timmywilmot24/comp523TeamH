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
			collegeTipsRender.push(
				<View key={i + 'z'}>
					{i === this.state.college.length - 1 ? (
						<View key={i + 'a'}>
							<Text key={i + 'b'}>{this.state.college[i]}</Text>
						</View>
					) : (
						<View
							key={i + 'c'}
							style={collegeScreenStyles.regularTextContainer}
						>
							<Text key={i + 'd'}>{this.state.college[i]}</Text>
						</View>
					)}
				</View>
			);
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
						<View style={collegeScreenStyles.tipsContainer}>
							<View style={collegeScreenStyles.titleContainer}>
								<Ionicons
									style={collegeScreenStyles.titlesIcons}
									name="bookmark"
									color="#B71914"
									size={35}
								></Ionicons>
								<Text style={collegeScreenStyles.title}>College Tips</Text>
							</View>
							{collegeTipsRender}
						</View>
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
	tipsContainer: {
		marginBottom: screenWidth * (3 / 4),
		backgroundColor: 'white',
		padding: screenWidth * (1 / 25),
		width: screenWidth * (13 / 15),
		alignSelf: 'center',
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		marginTop: screenWidth * (1 / 9),
	},
	titleContainer: {
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
	regularTextContainer: {
		borderBottomColor: 'rgba(0, 0, 0, 0.2)',
		borderBottomWidth: 1,
		marginBottom: screenWidth * (1 / 30),
		paddingBottom: screenWidth * (1 / 30),
	},
});
