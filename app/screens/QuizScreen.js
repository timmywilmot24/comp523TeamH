import React, { Component } from 'react';
import {
	Text,
	ScrollView,
	View,
	StyleSheet,
	Pressable,
	Image,
} from 'react-native';
import Header from '../components/Header.js';
import QuizForm from '../components/QuizForm';
import { styles } from '../screens/MainScreen.js';

export default class QuizScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quizView: false,
			takenQuiz: false,
			Business: 0,
			Humanities: 0,
			Journalism: 0,
			LawPolitics: 0,
			Medicine: 0,
			NaturalScience: 0,
			Technology: 0,
			Theatre: 0,
		};
	}
	getQuizResult() {
		let db = this.props.route.params.db;
		db.database()
			.ref('users/' + this.props.route.params.userID + '/quizResult')
			.get()
			.then((result) => {
				if (result.val() !== 0) {
					this.setState({
						takenQuiz: true,
						Business: result.val().Business,
						Humanities: result.val().Humanities,
						Journalism: result.val().Journalism,
						LawPolitics: result.val().LawPolitics,
						Medicine: result.val().Medicine,
						NaturalScience: result.val().NaturalScience,
						Technology: result.val().Technology,
						Theatre: result.val().Theatre,
					});
				}
			});
	}
	render() {
		this.getQuizResult();
		return (
			<View style={styles.body}>
				<Header title={'Quiz'} />
				{/*
         This view below is the main		*/}
				{this.state.takenQuiz ? (
					//show results here
					<ScrollView>
						<Text>Result</Text>
						<View>
							<Text>{this.state.Business}</Text>
							<Text>{this.state.Humanities}</Text>
							<Text>{this.state.Journalism}</Text>
							<Text>{this.state.LawPolitics}</Text>
							<Text>{this.state.Medicine}</Text>
							<Text>{this.state.NaturalScience}</Text>
							<Text>{this.state.Technology}</Text>
							<Text>{this.state.Theatre}</Text>
						</View>
					</ScrollView>
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
