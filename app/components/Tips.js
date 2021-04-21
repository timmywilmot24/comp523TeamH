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
export default class Tips extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tips: this.props.tips,
		};
	}
	render() {
		let tipsRender = [];
		for (let i = 0; i < this.state.tips.length; i++) {
			tipsRender.push(
				<View key={i + 'z'}>
					{i === this.state.tips.length - 1 ? (
						<View key={i + 'a'}>
							<Text key={i + 'b'}>{this.state.tips[i]}</Text>
						</View>
					) : (
						<View key={i + 'c'} style={tipsScreenStyles.regularTextContainer}>
							<Text key={i + 'd'}>{this.state.tips[i]}</Text>
						</View>
					)}
				</View>
			);
		}
		return (
			<View>
				<View style={tipsScreenStyles.backButtonContainer}>
					<Pressable
						style={tipsScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={tipsScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={tipsScreenStyles.backText}>Back</Text>
					</Pressable>
				</View>
				<View>
					<View style={tipsScreenStyles.tipsContainer}>
						<View style={tipsScreenStyles.titleContainer}>
							<Ionicons
								style={tipsScreenStyles.titlesIcons}
								name="bookmark"
								color="#B71914"
								size={35}
							></Ionicons>
							<Text style={tipsScreenStyles.title}>Tips</Text>
						</View>
						{tipsRender}
					</View>
				</View>
			</View>
		);
	}
}

const tipsScreenStyles = StyleSheet.create({
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
	tipsContainer: {
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
