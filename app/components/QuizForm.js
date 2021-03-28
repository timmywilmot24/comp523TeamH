import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	Image,
	ScrollView,
} from 'react-native';
import QuizScreen from '../screens/QuizScreen';

export default class QuizForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: this.props.userID,
			finishedQuiz: false,
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
			});
		this.setState({
			finishedQuiz: true,
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
			<View key={'quizHead'} style={styles.quizHeadViewBefore}>
				<Text>Which would you rather do after school?</Text>
				<Text>{this.state.question + 1}</Text>
			</View>
		);
		if (!this.state.dataGrabbed) {
			this.getData();
		} else {
			for (let i = 0; i < this.state.length; i++) {
				responsesRender.push(
					<View key={i} style={styles.responseView}>
						<Pressable
							onPress={() => this.nextQuestion(this.state.responses[i].subject)}
						>
							<Image
								style={{ width: 250, height: 250 }}
								source={{
									uri: this.state.responses[i].pic,
								}}
							/>
							<Text>{this.state.responses[i].action}</Text>
						</Pressable>
					</View>
				);
			}
		}
		return (
			<View>
				{this.state.finishedQuiz ? (
					//this is a problem after trying to take it a second time bc firebase is not passed on to quiz screen
					<QuizScreen takenQuiz={true} />
				) : (
					<View style={styles.body}>
						{this.state.dataGrabbed ? (
							// This is when the data is received
							<ScrollView style={styles.main}>
								<View>
									{quizHead}
									{responsesRender}
								</View>
							</ScrollView>
						) : (
							// This is before we get the data
							<View style={styles.main}></View>
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	quizHeadViewBefore: {
		backgroundColor: 'gray',
	},
	quizHeadViewAfter: {
		backgroundColor: 'white',
	},
	responseView: {
		backgroundColor: 'black',
	},
	resultView: {
		backgroundColor: 'gray',
	},
});
