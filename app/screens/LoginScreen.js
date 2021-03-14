import React, { Component } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	Text,
	ImageBackground,
	Button,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import LoginForm from '../components/LoginForm.js';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// Renders a login screen with the following features:
	// Allows user to click outside keyboard to close it
	// Puts background in ImageBackground
	// Calls LoginForm Component that lets them login
	// Has options to "forgot password?" and "create account"
	render() {
		return (
			<View style={styles.body}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<SafeAreaView>
						<View style={styles.logo}>
							<Text style={styles.logoText}>Mission: Scholarship</Text>
						</View>

						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.headerText}>Hey,</Text>
								<Text style={styles.headerText}>Login Now</Text>
								<Text
									style={styles.headerTextBottom}
									onPress={() => this.props.navigation.navigate('Register')}
								>
									No account? Register!
								</Text>
							</View>
							<LoginForm
								firebase={this.props.route.params.firebase}
								props={this.props}
							></LoginForm>
						</View>
					</SafeAreaView>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#F6931D',
	},
	logo: {
		marginTop: '15%',
		alignSelf: 'center',
		width: '80%',
		borderRadius: 20,
		borderWidth: 5,
		borderColor: 'white',
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
	},
	logoText: {
		fontSize: 34,
		textAlign: 'center',
		fontWeight: 'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	form: {
		marginTop: '15%',
		backgroundColor: '#B71914',
		borderTopLeftRadius: 40,
		height: '100%',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.25,
	},
	header: {
		marginTop: '10%',
		marginBottom: '10%',
		marginLeft: '10%',
	},
	headerText: {
		color: 'white',
		fontSize: 36,
		fontWeight: '700',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	headerTextBottom: {
		color: '#F6931D',
		fontWeight: 'bold',
		fontSize: 24,
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
});
