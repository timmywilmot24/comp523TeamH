import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import Header from '../components/Header.js';
import QuizForm from '../components/QuizForm';
import { styles } from '../screens/MainScreen.js';

export default class QuizScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quizView: false,
			takenQuiz: false,
		};
	}

	render() {
		// let db = this.props.route.params.db;
		// db.database()
		// 	.ref('users/' + this.props.route.params.userID + '/')
		// 	.get()
		// 	.then((taken) => {
		// 		this.setState({
		// 			takenQuiz: taken,
		// 		});
		// 	});
		return (
			<View style={styles.body}>
				<Header title={'Quiz'} />
				{/*
         This view below is the main		*/}
				{this.state.takenQuiz ? (
					//show results here
					<View>
						<Text>Taken Quiz</Text>
					</View>
				) : (
					<View style={styles.main}>
						{this.state.quizView ? (
							<QuizForm
								question={0}
								firebase={this.props.route.params.db}
								userID={this.props.route.params.userID}
								setState={(takenQuiz) => {
									this.setState({ takenQuiz: takenQuiz });
								}}
							/>
						) : (
							<View style={quizScreenStyles.card}>
								<View style={quizScreenStyles.intro}>
									<Text style={quizScreenStyles.introText}>
										What should you do in high school to prepare for college
										based on your interests? Take the quiz to find out.
									</Text>
								</View>
								<View style={quizScreenStyles.buttonSec}>
									<Image
										source={require('../assets/grad.png')}
										style={quizScreenStyles.pic}
									/>
									<Pressable
										style={quizScreenStyles.takeQuizButton}
										onPress={() =>
											this.setState({
												quizView: true,
											})
										}
									>
										<Text style={quizScreenStyles.buttonText}>
											Take the Quiz!
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					</View>
				)}
			</View>
		);
	}
}

const quizScreenStyles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		height: 410,
		width: '90%',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,

		marginRight: '5%',
		marginLeft: '5%',
		marginTop: '25%',
	},
	intro: {
		backgroundColor: '#B71914',
		width: '90%',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		marginRight: '5%',
		marginLeft: '5%',
		alignItems: 'center',
		padding: 15,
		marginTop: 20,
		marginBottom: 20,
	},
	introText: {
		color: 'white',
		fontSize: 16,
	},
	buttonSec: {
		backgroundColor: 'white',
		width: '90%',
		height: 215,
		marginRight: '5%',
		marginLeft: '5%',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	pic: {
		width: '100%',
		height: 215,
		borderRadius: 5,
	},
	takeQuizButton: {
		backgroundColor: '#B71914',
		zIndex: 1,
		position: 'absolute',
		width: '60%',
		height: 60,
		opacity: 0.9,
		borderRadius: 10,
		top: 77,
		left: 70,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 4 },
		textShadowRadius: 4,
		textAlign: 'center',
		marginTop: '8%',
		fontWeight: 'bold',
	},
});
