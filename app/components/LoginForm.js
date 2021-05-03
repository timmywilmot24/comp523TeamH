import React, { Component } from 'react';
import {
	Text,
	Alert,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: '',
			errorCode: 0,
			errorText: '',
		};
	}

	// Creates function that handles an attempt to login
	onLogin() {
		const { email, password } = this.state;

		// If email or password is empty, send alert to prompt user
		if (email === '') {
			this.setState({
				errorCode: 1,
				errorText: 'Enter email to login',
			});
		} else if (password === '') {
			this.setState({
				errorCode: 2,
				errorText: 'Enter password to login',
			});
		} else {
			this.setState({
				isLoading: true,
			});

			// Makes firebase call to authorize email and password
			// If successful, log that the user logged in (delete later, for debugging purposes)
			// and navigate to main (Add functionality to send user to Main);
			// If unsuccessful, prompt user with corresponding error message
			this.props.firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then((auth) => {
					this.setState({
						isLoading: false,
						email: '',
						password: '',
					});
					this.props.props.navigation.navigate('Main', {
						uid: auth.user.uid,
					});
				})
				.catch((error) => {
					let message = error.toString();
					if (message === 'Error: The email address is badly formatted.') {
						this.setState({
							errorCode: 1,
							errorText: 'The email address you entered is invalid',
						});
					} else if (
						message ===
						'Error: There is no user record corresponding to this identifier. The user may have been deleted.'
					) {
						this.setState({
							errorCode: 1,
							errorText: 'The email address is not associated with an account',
						});
					} else if (
						message ===
						'Error: The password is invalid or the user does not have a password.'
					) {
						this.setState({
							errorCode: 2,
							errorText: 'The password you entered is invalid',
						});
					} else {
						this.setState({
							errorCode: 3,
							errorText: message,
						});
					}
				});
		}
	}

	render() {
		return (
			// Renders with two placeholders for user to type info into email and password
			// Login text calls onLogin() when it's pressed
			<View style={styles.formInput}>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						placeholderTextColor="white"
						selectionColor={'#F6931D'}
						autoCompleteType="email"
						value={this.state.email}
						onChangeText={(email) => this.setState({ email })}
						label="Email"
					/>
					{this.state.errorCode == 1 ? (
						<Text style={{ color: 'white', padding: 5 }}>
							{this.state.errorText}
						</Text>
					) : (
						<Text style={{ color: '#B71914', padding: 5 }}>
							{this.state.errorText}
						</Text>
					)}
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Password"
						placeholderTextColor="white"
						selectionColor={'#F6931D'}
						value={this.state.password}
						onChangeText={(password) => this.setState({ password })}
						label="Password"
						secureTextEntry={true}
					/>
					{this.state.errorCode == 2 ? (
						<Text style={{ color: 'white', padding: 5 }}>
							{this.state.errorText}
						</Text>
					) : (
						<Text style={{ color: '#B71914', padding: 5 }}>
							{this.state.errorText}
						</Text>
					)}
					<Text
						style={styles.forgot}
						onPress={() => this.props.props.navigation.navigate('Reset')}
					>
						Forgot Password?
					</Text>
				</View>
				<TouchableOpacity
					style={styles.loginButton}
					title="Login"
					onPress={() => this.onLogin()}
				>
					<Text style={styles.login}>Login</Text>
				</TouchableOpacity>
				{this.state.errorCode == 3 ? (
					<Text style={{ color: 'white', padding: 5 }}>
						{this.state.errorText}
					</Text>
				) : (
					<Text style={{ color: '#B71914', padding: 5 }}>
						{this.state.errorText}
					</Text>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formInput: {
		width: '80%',
		marginLeft: '10%',
		marginRight: '10%',
	},
	inputs: {
		//backgroundColor: "white",
		marginTop: 15,
		fontSize: 20,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		borderRadius: 5,
		padding: 5,
		// Added these three
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		color: 'white',
	},
	forgot: {
		marginTop: 10,
		paddingLeft: 5,
		color: 'white',
		fontSize: 18,
		fontWeight: '300',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	loginButton: {
		backgroundColor: '#F6931D',
		width: '60%',
		marginTop: '10%',
		marginLeft: '20%',
		marginRight: '20%',
		alignItems: 'center',
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		paddingTop: '2%',
		paddingBottom: '2%',
	},
	login: {
		fontSize: 24,
		color: 'white',
		fontWeight: 'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
});
