import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default class QuizForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			question: this.props.question,
		};
	}

	getData() {
		let db = this.props.firebase;
		db.database()
			.ref('quiz/categoryQuestions/' + this.state.question)
			.get()
			.then((quiz) => {
				this.setState({
					q: quiz,
				});
				console.log(this.state.q);
			});
	}

	render() {
		return (
			<View style={styles.body}>
				<Text>Questions</Text>
				<Pressable onPress={() => this.getData()}>
					<Text>Take the Quiz!</Text>
				</Pressable>
				<Text>{this.state.question}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
	},
});
