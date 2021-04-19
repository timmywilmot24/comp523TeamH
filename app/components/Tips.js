import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { styles } from '../screens/MainScreen.js';
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
				<Pressable onPress={() => this.props.setState(false)}>
					<Text>Back</Text>
				</Pressable>
				<ScrollView>
					<Text>Tips</Text>
					{tipsRender}
				</ScrollView>
			</View>
		);
	}
}

const tipsScreenStyles = StyleSheet.create({});
