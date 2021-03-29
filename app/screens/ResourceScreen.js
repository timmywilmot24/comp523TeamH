import React, { Component } from 'react';
import {
	Text,
	ScrollView,
	View,
	StyleSheet,
	Image,
	Pressable,
	SafeAreaView,
} from 'react-native';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';

export default class ResourceScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'Resources'} />
				{/*
         This view below is the main		*/}
				<ScrollView style={styles.main}></ScrollView>
			</View>
		);
	}
}

const resourcesScreenStyles = StyleSheet.create({
	//put style here
});
