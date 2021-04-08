import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	Dimensions,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	LogBox,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
const screenWidth = Dimensions.get('window').width;
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
				this.props.setState(true, false, false);
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
				db.database()
					.ref('quiz/numberOfQuestions')
					.get()
					.then((num) => {
						this.setState({
							dataGrabbed: true,
							responses: r,
							length: l,
							numQuestion: num,
						});
					});
			});
	}

	componentDidMount() {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}

	render() {
		let responsesRender = [];
		let quizHead = (
			<View key={'quizHead'} style={styles.quizHeadView}>
				<Text style={styles.quizHeadText}>
					{this.state.question + 1}) Which would you rather do after school? Tap
					on the image to select your answer.
				</Text>
			</View>
		);
		if (!this.state.dataGrabbed) {
			this.getData();
		} else {
			for (let i = 0; i < this.state.length; i++) {
				responsesRender.push({
					subject: this.state.responses[i].subject,
					action: this.state.responses[i].action,
					pic: this.state.responses[i].pic,
				});
			}
		}
		return (
			<View>
				{quizHead}
				<ScrollView>
					<View
						style={{
							marginBottom:
								this.state.responses.length > 4 &&
								(Math.ceil(this.state.responses.length / 2) - 3) *
									(screenWidth * 0.8),
						}}
					>
						{this.state.dataGrabbed && (
							<FlatGrid
								onEndReachedThreshold={0.5}
								itemDimension={screenWidth * (1 / 3)}
								data={responsesRender}
								style={styles.gridView}
								renderItem={({ item }) => (
									<View>
										<Pressable onPress={() => this.nextQuestion(item.subject)}>
											<ImageBackground
												style={styles.responseImage}
												imageStyle={styles.actualImage}
												source={{
													uri: item.pic,
												}}
											>
												<Text style={styles.action}>{item.action}</Text>
											</ImageBackground>
										</Pressable>
									</View>
								)}
							/>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	quizHeadView: {
		backgroundColor: '#F4F5F7',
		alignItems: 'center',
	},
	quizHeadText: {
		fontSize: 16,
		marginTop: 5,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	gridView: {
		backgroundColor: '#F4F5F7',
		width: screenWidth,
	},
	responseImage: {
		width: screenWidth * (7 / 15),
		height: screenWidth * (1 / 2),
		alignItems: 'center',
		justifyContent: 'flex-end',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	action: {
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: '100%',
	},
});
