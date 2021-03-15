import React, { Component } from 'react';
import {
	Text,
	Alert,
	Button,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			highSchool: '',
			grade: '',
		};
	}

	onRegister() {
		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			highSchool,
			grade,
		} = this.state;

		// If email or password is empty, or password doesn't match, send alert to prompt user
		if (email === '') {
			Alert.alert('Enter email to register');
		} else if (password === '') {
			Alert.alert('Enter password to register');
		} else if (password !== confirmPassword) {
			Alert.alert('Passwords do not match');
		} else {
			this.setState({
				isLoading: true,
			});
			this.props.firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((auth) => {
					this.props.firebase
						.database()
						.ref('users/' + auth.user.uid)
						.set({
							email: email,
							password: password,
							firstName: firstName,
							lastName: lastName,
							highSchool: highSchool,
							grade: grade,
						});
					this.setState({
						isLoading: false,
						email: '',
						password: '',
					});
					this.props.props.navigation.navigate('Main', {
						uid: auth.user.uid,
					});
				});
		}
	}
	render() {
		return (
			<View style={styles.form}>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="First name"
						value={this.state.firstName}
						onChangeText={(firstName) => this.setState({ firstName })}
						label="First name"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Last name"
						value={this.state.lastName}
						onChangeText={(lastName) => this.setState({ lastName })}
						label="Last name"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						value={this.state.email}
						onChangeText={(email) => this.setState({ email })}
						label="Email"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Password"
						value={this.state.password}
						onChangeText={(password) => this.setState({ password })}
						label="Password"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Confirm Password"
						value={this.state.confirmPassword}
						onChangeText={(confirmPassword) =>
							this.setState({ confirmPassword })
						}
						label="Confirm Password"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="High School"
						value={this.state.highSchool}
						onChangeText={(highSchool) => this.setState({ highSchool })}
						label="High school"
					/>
				</View>
				<View>
					<TextInput
						style={styles.inputs}
						placeholder="Grade"
						value={this.state.grade}
						onChangeText={(grade) => this.setState({ grade })}
						label="Grade"
					/>
				</View>
				<TouchableOpacity
					style={styles.registerButton}
					title="Register"
					onPress={() => this.onRegister()}
				>
					<Text style={styles.register}>Register</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	form: {
		width: '80%',
		marginTop: '5%',
		marginLeft: '10%',
		marginRight: '10%',
	},
	inputs: {
		backgroundColor: 'white',
		marginTop: 15,
		fontSize: 24,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		borderRadius: 5,
		padding: 5,
	},
	registerButton: {
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
	},
	register: {
		fontSize: 36,
		color: 'white',
		fontWeight: 'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
});
