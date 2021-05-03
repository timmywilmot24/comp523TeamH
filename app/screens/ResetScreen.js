import React, { Component } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	LogBox,
} from 'react-native';

export default class ResetScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			emailVerify: '',
		};
	}

	componentDidMount() {
		LogBox.ignoreLogs([
			'Non-serializable values were found in the navigation state. Check',
		]);
	}

	onReset() {
		const { email, emailVerify } = this.state;

		// If email or password is empty, send alert to prompt user
		if (email === '') {
			Alert.alert('Enter email to reset');
		} else if (emailVerify === '') {
			Alert.alert('Enter email to reset');
		} else if (email !== emailVerify) {
			Alert.alert('Emails do not match');
		} else {
			this.setState({
				isLoading: true,
			});

			// Sends reset email
			this.props.route.params.firebase
				.auth()
				.sendPasswordResetEmail(email)
				.then(() => {
					console.log(email);
					this.setState({
						isLoading: false,
						email: '',
						emailVerify: '',
					});
					this.props.navigation.navigate('Login');
				})
				.catch((error) => {
					switch (error.toString()) {
						case 'Error: The email address is badly formatted.':
							Alert.alert('The email address entered is invalid.');
						case 'Error: There is no user record corresponding to this identifier. The user may have been deleted.':
							Alert.alert(
								'The email address is not associated with an account.'
							);
						default:
							Alert.alert(error.toString());
					}
				});
		}
	}
	render() {
		return (
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<SafeAreaView style={{ flex: 1, backgroundColor: '#F6931D' }}>
						<View style={styles.section}>
							<Text style={styles.headerText}>Reset Password</Text>
							<View>
								<TextInput
									placeholder="Email"
									autoCompleteType="email"
									style={styles.inputs}
									placeholderTextColor="white"
									selectionColor={'#F6931D'}
									value={this.state.email}
									onChangeText={(email) => this.setState({ email })}
									label="Email"
								/>
							</View>
							<View>
								<TextInput
									placeholder="Verify email"
									autoCompleteType="email"
									selectionColor={'#F6931D'}
									style={styles.inputs}
									placeholderTextColor="white"
									value={this.state.emailVerify}
									onChangeText={(emailVerify) => this.setState({ emailVerify })}
									label="EmailVerify"
								/>
							</View>
							<TouchableOpacity
								title="reset"
								style={styles.resetButton}
								onPress={() => this.onReset()}
							>
								<Text style={styles.reset}>Reset Password</Text>
							</TouchableOpacity>
							<TouchableOpacity
								title="login"
								style={styles.resetButton}
								onPress={() => this.props.navigation.navigate('Login')}
							>
								<Text style={styles.reset}>Go to login screen</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	section: {
		backgroundColor: '#B71914',
		height: '100%',
		marginTop: '45%',
		borderTopLeftRadius: 40,
		padding: '10%',
	},
	headerText: {
		color: 'white',
		fontSize: 36,
		fontWeight: '700',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
		marginBottom: 15,
	},
	resetButton: {
		backgroundColor: '#F6931D',
		width: '80%',
		marginTop: '10%',
		marginLeft: 'auto',
		marginRight: 'auto',
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
	reset: {
		fontSize: 24,
		color: 'white',
		fontWeight: 'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	inputs: {
		marginVertical: 15,
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
});
