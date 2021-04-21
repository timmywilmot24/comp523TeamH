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

export default class Extra extends Component {
	constructor(props) {
		super(props);

		this.state = {
			extra: this.props.extra,
		};
	}
	render() {
		let options = this.state.extra.options;
		let optionsRender = [];

		for (let i = 0; i < options.length; i++) {
			optionsRender.push(
				<View style={extraScreenStyles.noteContainers}>
					<Text key={i}>{options[i]}</Text>
				</View>
			);
		}

		return (
			<View>
				<View style={extraScreenStyles.backButtonContainer}>
					<Pressable
						style={extraScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={extraScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={extraScreenStyles.backText}>Back</Text>
					</Pressable>
				</View>
				<View>
					<View style={extraScreenStyles.extraContainer}>
						<View style={extraScreenStyles.titleContainer}>
							<Ionicons
								style={extraScreenStyles.titlesIcons}
								name="body"
								color="#B71914"
								size="35"
							></Ionicons>
							<Text style={extraScreenStyles.title}>Extracurricular</Text>
						</View>

						<View style={extraScreenStyles.regularTextContainer}>
							<Text>{this.state.extra.notes}</Text>
						</View>

						<View style={extraScreenStyles.regularTextContainer}>
							<Text>{this.state.extra.notes2}</Text>
						</View>

						<View>
							<Text style={extraScreenStyles.subtitle}>Options</Text>
							{optionsRender}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const extraScreenStyles = StyleSheet.create({
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
	extraContainer: {
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
	titlesIcons: {
		alignSelf: 'center',
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
	subtitle: {
		color: '#B71914',
		marginVertical: screenWidth * (1 / 70),
		fontSize: 15,
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
