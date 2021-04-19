import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';
import Classes from '../components/Classes.js';
import CollegeTips from '../components/CollegeTips.js';
import Extra from '../components/Extra.js';
import Tips from '../components/Tips.js';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataGrabbed: false,
			db: this.props.route.params.db,
			userID: this.props.route.params.userID,
			usersTrack: '',
			track: '',
			grade: '',
			classRender: false,
			collegeRender: false,
			extraRender: false,
			tipsRender: false,
		};
	}

	loadUserInfo() {
		this.state.db
			.database()
			.ref('users/' + this.state.userID)
			.get()
			.then((data) => {
				this.setState({
					usersTrack: data.val().track,
					grade: data.val().grade,
				});
				this.loadTrack();
			});
	}

	loadTrack() {
		this.state.db
			.database()
			.ref('track/')
			.get()
			.then((data) => {
				this.setState({
					track: data.val(),
					dataGrabbed: true,
				});
			});
	}

	render() {
		let feed = [];
		let items = [
			{
				label: 'Business',
				value: 'Business',
			},
			{
				label: 'Law and Politics',
				value: 'LawPolitics',
			},
			{
				label: 'Theatre and Film',
				value: 'Theatre',
			},
			{
				label: 'Journalism',
				value: 'Journalism',
			},
			{
				label: 'Natural Sciences',
				value: 'NaturalScience',
			},
			{
				label: 'Humanities',
				value: 'Humanities',
			},
			{
				label: 'Technology',
				value: 'Technology',
			},
			{
				label: 'Medicine',
				value: 'Medicine',
			},
		];
		let screenRender = (
			<View>
				<DropDownPicker
					items={items}
					defaultValue={this.state.usersTrack}
					containerStyle={{ height: 40 }}
					style={{ backgroundColor: '#fafafa', width: '35%' }}
					itemStyle={{
						justifyContent: 'flex-start',
					}}
					dropDownStyle={{ backgroundColor: '#fafafa' }}
					onChangeItem={(item) => {
						this.setState({
							usersTrack: item.value,
						});
					}}
				/>
				{/* <View style={homeScreenStyles.profileCard}>
					<Text>Profile</Text>
				</View> */}
				<Pressable
					style={homeScreenStyles.classCard}
					onPress={() => this.setState({ classRender: true })}
				>
					<Text>Class</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.extraCard}
					onPress={() => this.setState({ extraRender: true })}
				>
					<Text>Extracurricular</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.tipsCard}
					onPress={() => this.setState({ tipsRender: true })}
				>
					<Text>Tips</Text>
				</Pressable>
				<Pressable
					style={homeScreenStyles.collegeCard}
					onPress={() => this.setState({ collegeRender: true })}
				>
					<Text>College Tips</Text>
				</Pressable>
			</View>
		);
		if (!this.state.dataGrabbed) {
			this.loadUserInfo();
		} else {
			let trackInfo = [];
			for (let i = 0; i < 8; i++) {
				if (this.state.track[i].name === this.state.usersTrack) {
					trackInfo = this.state.track[i][this.state.grade];
				}
			}
			if (this.state.classRender) {
				screenRender = (
					<Classes
						classes={trackInfo.classes}
						setState={(classRender) => {
							this.setState({
								classRender: classRender,
							});
						}}
					></Classes>
				);
			} else if (this.state.collegeRender) {
				screenRender = (
					<CollegeTips
						college={trackInfo.college}
						setState={(collegeRender) => {
							this.setState({
								collegeRender: collegeRender,
							});
						}}
					></CollegeTips>
				);
			} else if (this.state.extraRender) {
				screenRender = (
					<Extra
						activities={trackInfo.activities}
						setState={(extraRender) => {
							this.setState({
								extraRender: extraRender,
							});
						}}
					></Extra>
				);
			} else if (this.state.tipsRender) {
				screenRender = (
					<Tips
						tips={trackInfo.tips}
						setState={(tipsRender) => {
							this.setState({
								tipsRender: tipsRender,
							});
						}}
					></Tips>
				);
			}
		}
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'Dashboard'} />
				{/*
         This view below is the main		*/}
				<ScrollView style={styles.main}>{screenRender}</ScrollView>
			</View>
		);
	}
}

const homeScreenStyles = StyleSheet.create({
	profileCard: {
		backgroundColor: 'white',
	},
	classCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
	extraCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
	tipsCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
	collegeCard: {
		marginTop: 5,
		backgroundColor: 'white',
	},
});
