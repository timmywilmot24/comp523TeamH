import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	Image,
	ScrollView,
} from 'react-native';

export default class QuizForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: this.props.userID,
			question: this.props.question,
			dataGrabbed: false,
			numQuestion: 0,
			responses: [],
			length: 0,
			subjectResult: {
				Business: 0,
				LawPolitics: 0,
				Theatre: 0,
				Journalism: 0,
				NaturalScience: 0,
				Humanities: 0,
				Technology: 0,
				Medicine: 0,
			},
		};
	}

	nextQuestion(subject) {
		let sResults = this.state.subjectResult;
		if (this.state.question + 1 == this.state.numQuestion.val()) {
			this.updateData();
		} else {
			//go on to the next set of question
			if (subject.length > 1) {
				for (let i = 0; i < subject.length; i++) {
					sResults[subject[i]] = 1 + sResults[subject[i]];
				}
			} else {
				sResults[subject] = 1 + sResults[subject];
			}
			this.setState({
				subjectResult: sResults,
				question: this.state.question + 1,
				dataGrabbed: false,
				responses: [],
				length: 0,
			});
		}
	}

	updateData() {
		let db = this.props.firebase;
		db.database()
			.ref('users/' + this.state.userID)
			.update({
				hasTakenQuiz: true,
				quizResult: this.state.subjectResult,
			})
			.then(() => {
				this.props.setState(true, false);
			});
	}

	getData() {
		let db = this.props.firebase;
		db.database()
			.ref('quiz/categoryQuestions/' + this.state.question + '/responses')
			.get()
			.then((responses) => {
				let r = [];
				let l = 0;
				responses.forEach((response) => {
					l += 1;
					r.push({
						action: response.val().action,
						pic: response.val().pic,
						subject: response.val().subject,
					});
				});
				this.setState({
					dataGrabbed: true,
					responses: r,
					length: l,
				});
			});
		db.database()
			.ref('quiz/numberOfQuestions')
			.get()
			.then((num) => {
				this.setState({
					numQuestion: num,
				});
			});
	}

	render() {
		let responsesRender = [];
		let quizHead = (
			<View key={'quizHead'} style={styles.quizHeadView}>
				<Text style={styles.quizHeadText}>
					Which would you rather do after school? Tap on the image to select
					your answer.
				</Text>
			</View>
		);
		if (!this.state.dataGrabbed) {
			this.getData();
		} else {
			for (let i = 0; i < this.state.length; i++) {
				responsesRender.push(
					<View key={i} style={styles.responseView}>
						<Pressable
							style={styles.responseContainer}
							onPress={() => this.nextQuestion(this.state.responses[i].subject)}
						>
							<View style={styles.responseImageContainer}>
								<Image
									style={styles.responseImage}
									source={{
										uri: this.state.responses[i].pic,
									}}
								/>
							</View>
							<View style={styles.actionContainer}>
								<Text numberOfLines={2} style={styles.actionText}>
									{this.state.responses[i].action}
								</Text>
							</View>
						</Pressable>
					</View>
				);
			}
		}
		return (
			<View>
				<View>{quizHead}</View>
				<View>
					{this.state.dataGrabbed ? (
						// This is when the data is received
						<ScrollView style={styles.scrollForm}>
							<View>{responsesRender}</View>
						</ScrollView>
					) : (
						// This is before we get the data show a loading bar
						<View style={styles.main}></View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	quizHeadView: {
		backgroundColor: 'white',
		alignItems: 'center',
	},
	quizHeadText: {
		fontSize: 16,
		marginTop: 5,
		marginBottom: 5,
	},
	responseView: {
		alignItems: 'center',
		marginTop: '10%',
	},
	responseContainer: {
		alignItems: 'center',
		backgroundColor: '#B71914',
		width: '90%',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		borderRadius: 5,
	},
	responseImageContainer: {
		width: 250,
		borderRadius: 5,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		marginBottom: '2.5%',
		marginTop: '5%',
	},
	responseImage: {
		width: 250,
		height: 250,
		borderRadius: 5,
	},
	actionContainer: {
		marginBottom: '5%',
		flexDirection: 'row',
		flex: 1,
	},
	actionText: {
		width: '100%',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},
});
