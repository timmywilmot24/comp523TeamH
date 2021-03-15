import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
				<View style={styles.header}>
					<SafeAreaView>
						<Text style={styles.headerText}>Dashboard</Text>
					</SafeAreaView>
				</View>
				{/*
         This view below is the main		*/}
				<ScrollView style={styles.main}>
					<View style={homeStyles.profileCard}>
						<Text>Profile</Text>
					</View>
					<View style={homeStyles.classCard}>
						<Text>Class</Text>
					</View>
					<View style={homeStyles.extraCard}>
						<Text>Extracurricular</Text>
					</View>
					<View style={homeStyles.tipsCard}>
						<Text>Tips</Text>
					</View>
				</ScrollView>
				{/*
         This view below is the navBar		*/}
				<View style={styles.navBar}>
					<Pressable
						style={styles.navButton}
						onPress={() => this.props.navigation.navigate('Home')}
					>
						<Icon name="home" size={50} color="black" />
						<Text style={styles.navText}>Home</Text>
					</Pressable>

					<Pressable
						style={styles.navButton}
						onPress={() => this.props.navigation.navigate('Resource')}
					>
						<Icon name="briefcase" size={50} color="black" />
						<Text style={styles.navText}>Resources</Text>
					</Pressable>
					<Pressable
						style={styles.navButton}
						onPress={() => this.props.navigation.navigate('Quiz')}
					>
						<Icon name="check-square" size={50} color="black" />
						<Text style={styles.navText}>Quiz</Text>
					</Pressable>
					<Pressable
						style={styles.navButton}
						onPress={() => this.props.navigation.navigate('News')}
					>
						<Icon name="rss-square" size={50} color="black" />
						<Text style={styles.navText}>News</Text>
					</Pressable>
					<Pressable
						style={styles.navButton}
						onPress={() => this.props.navigation.navigate('Settings')}
					>
						<Icon name="cog" size={50} color="black" />
						<Text style={styles.navText}>Settings</Text>
					</Pressable>
				</View>
			</View>
		);
	}
}

export const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#F6931D',
	},
	header: {
		height: '13%',
		backgroundColor: '#B71914',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	headerText: {
		marginLeft: 5,
		marginTop: 15,
		color: '#FFFFFF',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 30,
		textAlign: 'left',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: 0, height: 4 },
		textShadowRadius: 4,
	},
	main: {
		marginTop: 20,
		flex: 1,
		backgroundColor: '#F6931D',
	},
	navBar: {
		height: '10%',
		backgroundColor: 'white',
		flexDirection: 'row',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.25,
	},
	navButton: {
		marginTop: 5,
		alignItems: 'center',
		flex: 1,
	},
	navText: {
		color: 'black',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
});

const homeStyles = StyleSheet.create({
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
