import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.title,
		};
	}
	render() {
		return (
			<View style={styles.header}>
				<SafeAreaView>
					<Text style={styles.headerText}>{this.state.title}</Text>
				</SafeAreaView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		height: '12%',
		backgroundColor: '#B71914',
	},
	headerText: {
		marginLeft: 5,
		//marginTop: screenWidth * (1 / ),
		color: '#FFFFFF',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 30,
		textAlign: 'left',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 4 },
		textShadowRadius: 4,
	},
});