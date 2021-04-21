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
			tipsRender.push(<Text key={i}>{this.state.tips[i]}</Text>);
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
					<ScrollView>
						<Text>Tips</Text>
						{tipsRender}
					</ScrollView>
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
});
