import React, { Component } from 'react';
import {
	Text,
	Alert,
	View,
	ScrollView,
	StyleSheet,
	TextInput,
	ImageBackground,
	Dimensions,
	LogBox,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
const screenWidth = Dimensions.get('window').width;
import DropDownPicker from 'react-native-dropdown-picker';
import AddQuestionQuiz from './AddQuestionQuiz';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AdminQuiz extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataLoaded: false,
			quiz: 0,
			question: 1,
			addQuestion: false,
		};
	}

	loadData() {
		this.props.db
			.database()
			.ref('quiz')
			.get()
			.then((quiz) => {
				this.setState({
					quiz: quiz,
					dataLoaded: true,
				});
			})
			.catch(() => {
				Alert.alert(
					'Unable to connect to database. Try resetting your Internet or reconnecting.'
				);
			});
	}

	componentDidMount() {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}

	render() {
		let items = [];
		let responses = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			for (let i = 0; i < this.state.quiz.val().numberOfQuestions; i++) {
				let value = i + 1;
				items.push({
					label: 'Question ' + value,
					value: value,
				});
			}
			this.state.quiz
				.val()
				.categoryQuestions[this.state.question - 1].responses.forEach(
					(response) => {
						responses.push({
							action: response.action,
							pic: response.pic,
							subjects: response.subject,
						});
					}
				);
		}
		return (
			<View>
				{this.state.dataLoaded && (
					<View>
						{this.state.addQuestion ? (
							<AddQuestionQuiz
								db={this.props.db}
								newQuestionNumber={this.state.quiz.val().numberOfQuestions}
								setState={(addQuestion) => {
									this.setState({
										addQuestion: addQuestion,
										dataLoaded: false,
										quiz: 0,
									});
								}}
							/>
						) : (
							<View style={{ alignItems: 'center' }}>
								<View
									style={{
										width: screenWidth,
										justifyContent: 'center',
										flexDirection: 'row',
										padding: 10,
										backgroundColor: '#DDDDDD',
									}}
								>
									<DropDownPicker
										items={items}
										defaultValue={this.state.question}
										containerStyle={{
											height: 40,
											width: 150,
										}}
										style={{
											backgroundColor: '#fafafa',
											padding: 15,
										}}
										dropDownStyle={{ backgroundColor: '#fafafa' }}
										onChangeItem={(item) =>
											this.setState({
												question: item.value,
											})
										}
									/>
									<TouchableOpacity
										onPress={() => this.setState({ addQuestion: true })}
										style={{ paddingLeft: 10 }}
									>
										<Ionicons name="add" color={'#B71914'} size={35} />
									</TouchableOpacity>
								</View>
								<ScrollView style={{ zIndex: -1 }}>
									<View style={{ marginBottom: screenWidth * 0.9 }}>
										<FlatGrid
											onEndReachedThreshold={0.5}
											itemDimension={screenWidth * (1 / 3)}
											data={responses}
											renderItem={({ item }) => (
												<View>
													<ImageBackground
														style={styles.responseImage}
														source={{
															uri: item.pic,
														}}
													>
														<Text style={styles.action}>{item.action}</Text>
													</ImageBackground>
												</View>
											)}
										/>
									</View>
								</ScrollView>
							</View>
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	responseImage: {
		width: screenWidth * (7 / 15),
		height: screenWidth * (1 / 2),
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	action: {
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: '100%',
	},
});
