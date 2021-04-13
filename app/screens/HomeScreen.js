import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	SafeAreaView,
} from 'react-native';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';
export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'Dashboard'} />
				{/*
         This view below is the main		*/}
				<ScrollView style={styles.main}>
					<View style={homeScreenStyles.profileCard}>
						<Text>Profile</Text>
					</View>
					<View style={homeScreenStyles.classCard}>
						<Text>Class</Text>
					</View>
					<View style={homeScreenStyles.extraCard}>
						<Text>Extracurricular</Text>
					</View>
					<View style={homeScreenStyles.tipsCard}>
						<Text>Tips</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const homeScreenStyles = StyleSheet.create({
	profileCard: {
		backgroundColor: 'white',
	},
	classCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
	extraCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
	tipsCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
});
