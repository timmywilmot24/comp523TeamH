import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { styles } from '../screens/MainScreen.js';
export default class Extra extends Component {
	constructor(props) {
		super(props);

		this.state = {
			extra: this.props.extra,
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

const extraScreenStyles = StyleSheet.create({});
