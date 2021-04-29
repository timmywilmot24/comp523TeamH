import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TabYear from './TabYear.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get('window').width;
export default class AllGrades extends Component {
	constructor(props) {
		super(props);

		this.state = {
			track: '',
			subject: 'Business',
		};
	}
	loadData() {
		const path = `${FileSystem.cacheDirectory}track`;
		FileSystem.readAsStringAsync(path).then((data) => {
			this.setState({ track: JSON.parse(data), dataLoaded: true });
		});
	}
	render() {
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let classes = '';
			let track = this.state.track;
			console.log(track);
		}
		console.log(this.state.subject);
		return (
			<ScrollView>
				<Text>All</Text>
			</ScrollView>
		);
	}
}
