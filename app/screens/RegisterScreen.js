import React, { Component } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';

import RegisterForm from '../components/RegisterForm.js';

export default class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// Just has option to go back to login
	// Add registration stuff in this part
	render() {
		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView style={styles.body}>
					<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
						<SafeAreaView>
							<View style={styles.tab}>
								<View style={styles.header}>
									<Text style={styles.headerText}>Hey,</Text>
									<Text style={styles.headerText}>Register Now</Text>
									<Text
										style={styles.headerTextBottom}
										onPress={() => this.props.navigation.navigate('Login')}
									>
										Have an account? Login here!
									</Text>
								</View>
								<RegisterForm
									props={this.props}
									firebase={this.props.route.params.firebase}
								></RegisterForm>
							</View>
						</SafeAreaView>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	body: {
		flex: 1,
		backgroundColor: '#F6931D',
	},
	tab: {
		height: '200%',
		backgroundColor: '#B71914',
		marginTop: '15%',
		borderTopLeftRadius: 40,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.25,
	},
	header: {
		marginTop: '10%',
		marginLeft: '10%',
	},
	headerText: {
		color: 'white',
		fontSize: 28,
		fontWeight: '700',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	headerTextBottom: {
		color: '#F6931D',
		fontWeight: 'bold',
		fontSize: 18,
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
});
