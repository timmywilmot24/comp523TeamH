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
		let options = this.state.extra.options;
		let optionsRender = [];
		for (let i = 0; i < options.length; i++) {
			optionsRender.push(<Text key={i}>{options[i]}</Text>);
		}
		return (
			<View>
				<Pressable onPress={() => this.props.setState(false)}>
					<Text>Back</Text>
				</Pressable>
				<ScrollView>
					<Text>{this.state.extra.notes}</Text>
					<Text>{this.state.extra.notes2}</Text>
					{optionsRender}
				</ScrollView>
			</View>
		);
	}
}

const extraScreenStyles = StyleSheet.create({});
