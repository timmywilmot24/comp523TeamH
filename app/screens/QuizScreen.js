import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	SafeAreaView,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuizForm from '../components/QuizForm';

export default class QuizScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quizView: false,
		};
	}

	//this method will be moved to quizForm component; this is just for testing
	// getData() {
	// 	let db = this.props.route.params.firebase;
	// 	db.database()
	// 		.ref('quiz/categoryQuestions/0')
	// 		.get()
	// 		.then((quiz) => {
	// 			this.setState({
	// 				quiz,
	// 			});
	// 			console.log(this.state);
	// 		});
	// }

	render() {
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<View style={styles.header}>
					<SafeAreaView>
						<Text style={styles.headerText}>Quiz</Text>
					</SafeAreaView>
				</View>
				{/*
         This view below is the main		*/}
				<View style={styles.main}>
					{this.state.quizView ? (
						<QuizForm
							question={0}
							firebase={this.props.route.params.firebase}
						/>
					) : (
						<View style={quizScreenStyles.card}>
							<View style={quizScreenStyles.intro}>
								<Text style={quizScreenStyles.introText}>
									What should you do in high school to prepare for college based
									on your interest? Take the quiz to find out.
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
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 0, height: 4 },
		textShadowRadius: 4,
	},
	main: {
		marginTop: 10,
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
