import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	TextInput,
	Image,
	ImageBackground,
	Dimensions,
	Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';
import Classes from '../components/Classes.js';
import CollegeTips from '../components/CollegeTips.js';
import Extra from '../components/Extra.js';
import Tips from '../components/Tips.js';
import LoadingAnimationScreen from '../components/LoadingAnimationScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			userGrabbed: false,
			dataGrabbed: false,
			db: this.props.route.params.db,
			userID: this.props.route.params.userID,
			usersTrack: '',
			track: [],
			studentsObject: '',
			studentsArray: [],
			grade: '',
			classRender: false,
			collegeRender: false,
			extraRender: false,
			tipsRender: false,
			isAdmin: false,
			adminInput: '',
			adminGrade: 0,
			loadingDelete: false,
		};
	}

	loadUserInfo() {
		this.state.db
			.database()
			.ref('users/' + this.state.userID)
			.get()
			.then((data) => {
				this.setState({
					email: data.val().email,
					usersTrack: data.val().track,
					grade: data.val().grade,
					isAdmin:
						data.val().account === 'admin' ||
						data.val().account === 'masterAdmin',
					isMaster: data.val().account === 'masterAdmin',
					userGrabbed: true,
				});
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

	loadStudents() {
		this.state.db
			.database()
			.ref('users')
			.get()
			.then((data) => {
				this.setState({
					studentsObject: data.val(),
					dataGrabbed: true,
				});
			});
	}

	handleUpgrade(email) {
		this.setState({
			loadingDelete: true,
		});
		let studentID = '';
		for (let student in this.state.studentsObject) {
			if (this.state.studentsObject[student].email === email) {
				studentID = student;
			}
		}
		this.state.db
			.database()
			.ref('users/' + studentID)
			.update({
				account: 'admin',
			})
			.then(() => {
				this.state.db
					.database()
					.ref('admins/' + studentID)
					.set(true)
					.then(() => {
						this.setState({
							loadingDelete: false,
						});
					});
			});
		let studentsObject = this.state.studentsObject;
		studentsObject[studentID].account = 'admin';
		this.setState({
			studentsObject: studentsObject,
		});
	}

	handleDelete(email, profilePic) {
		this.setState({
			loadingDelete: true,
		});
		let studentID = '';
		for (let student in this.state.studentsObject) {
			if (this.state.studentsObject[student].email === email) {
				studentID = student;
			}
		}
		this.state.db
			.database()
			.ref('users/' + studentID)
			.remove()
			.then(() => {
				if (profilePic !== '') {
					this.state.db
						.storage()
						.child('usersProfilePics/' + studentID)
						.delete()
						.then(() => {
							this.setState({
								loadingDelete: false,
							});
						});
				} else {
					this.setState({
						loadingDelete: false,
					});
				}
			});
		let studentsObjects = this.state.studentsObject;
		delete studentsObjects[studentID];
		this.setState({
			studentObjects: studentsObjects,
		});
	}

	render() {
		let feed = [];
		let studentView = [];
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
				<ScrollView>
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
				</ScrollView>
				{/* <View style={homeScreenStyles.profileCard}>
					<Text>Profile</Text>
				</View> */}
			</View>
		);
		if (!this.state.userGrabbed) {
			this.loadUserInfo();
		} else if (!this.state.dataGrabbed) {
			if (this.state.isAdmin) {
				this.loadStudents();
			} else {
				this.loadTrack();
			}
		} else if (!this.state.isAdmin) {
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
						apCourses={trackInfo.apCourses}
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
						extra={trackInfo.activities}
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
		} else {
			let studentsArray = [];
			for (let student in this.state.studentsObject) {
				studentsArray.push(this.state.studentsObject[student]);
			}
			let result = studentsArray.filter((student) => {
				let name = student.firstName + ' ' + student.lastName;
				return name.toLowerCase().includes(this.state.adminInput.toLowerCase());
			});
			result = result.sort((a, b) => {
				if (a.firstName > b.firstName) {
					return 1;
				} else if (a.firstName < b.firstName) {
					return -1;
				} else {
					return 0;
				}
			});
			if (this.state.adminGrade !== 0) {
				result = result.filter((student) => {
					let grade = student.grade + '';
					let admin = this.state.adminGrade + '';
					return grade === admin;
				});
			}
			for (let i = 0; i < result.length; i++) {
				studentView.push(
					<View key={i} style={homeScreenStyles.profileContainer}>
						{result[i].profilePic === '' ? (
							<ImageBackground
								imageStyle={{ borderRadius: 75 / 2 }}
								style={homeScreenStyles.profilePic}
								source={require('../assets/defaultProfile.png')}
							/>
						) : (
							<ImageBackground
								imageStyle={{ borderRadius: 75 / 2 }}
								style={homeScreenStyles.profilePic}
								source={{
									uri: result[i].profilePic,
								}}
							/>
						)}
						{result[i].account === 'student' ? (
							<View style={homeScreenStyles.profileInfo}>
								<Text
									style={[
										homeScreenStyles.profileTextMain,
										{ color: 'orange' },
									]}
								>
									{result[i].firstName} {result[i].lastName}
								</Text>
								<Text
									style={[homeScreenStyles.profileTextSub, { color: 'orange' }]}
								>
									{result[i].track}
								</Text>
								<Text
									style={[homeScreenStyles.profileTextSub, { color: 'orange' }]}
								>
									{result[i].highSchool} | {result[i].grade}th grade
								</Text>
								<Text
									style={[homeScreenStyles.profileTextSub, { color: 'orange' }]}
								>
									{result[i].email}
								</Text>
							</View>
						) : (
							<View style={homeScreenStyles.profileInfo}>
								<Text
									style={[
										homeScreenStyles.profileTextMain,
										{ color: '#B71914' },
									]}
								>
									{result[i].firstName} {result[i].lastName}
								</Text>
								<Text
									style={[
										homeScreenStyles.profileTextSub,
										{ color: '#B71914' },
									]}
								>
									Administrator
								</Text>
								<Text
									style={[
										homeScreenStyles.profileTextSub,
										{ color: '#B71914' },
									]}
								>
									{result[i].highSchool} | {result[i].grade}th grade
								</Text>
								<Text
									style={[
										homeScreenStyles.profileTextSub,
										{ color: '#B71914' },
									]}
								>
									{result[i].email}
								</Text>
							</View>
						)}
						<View style={homeScreenStyles.ioniconsContainer}>
							{this.state.isMaster && result[i].account === 'student' && (
								<TouchableOpacity
									onPress={() => {
										Alert.alert(
											'Warning: Promote to Admin',
											'Are you sure that you want to promote ' +
												result[i].firstName +
												' ' +
												result[i].lastName +
												' to administrator?',
											[
												{
													text: 'Yes',
													onPress: () => this.handleUpgrade(result[i].email),
												},
												{
													text: 'No',
													style: 'cancel',
												},
											],
											{
												cancelable: true,
											}
										);
									}}
								>
									<Ionicons
										style={homeScreenStyles.ionicon}
										name="caret-up"
										size={25}
										color={'#27A745'}
									/>
								</TouchableOpacity>
							)}
							{this.state.email !== result[i].email && (
								<TouchableOpacity
									onPress={() => {
										Alert.alert(
											'Warning: Delete Account',
											'Are you sure that you want to delete ' +
												result[i].firstName +
												' ' +
												result[i].lastName +
												"'s account?",
											[
												{
													text: 'Yes',
													onPress: () =>
														this.handleDelete(
															result[i].email,
															result[i].profilePic
														),
												},
												{
													text: 'No',
													style: 'cancel',
												},
											],
											{
												cancelable: true,
											}
										);
									}}
								>
									<Ionicons
										style={homeScreenStyles.ionicon}
										name="trash"
										size={25}
										color={'#DC3545'}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>
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
				{this.state.userGrabbed &&
				this.state.dataGrabbed &&
				!this.state.loadingDelete ? (
					<View>
						{this.state.isAdmin ? (
							<View>
								<View style={homeScreenStyles.searchBarContainer}>
									<TextInput
										style={homeScreenStyles.searchBar}
										placeholder={'Search for students...'}
										value={this.state.adminInput}
										onChangeText={(adminInput) => this.setState({ adminInput })}
										label="Search"
									></TextInput>
									<DropDownPicker
										items={[
											{ value: 0, label: 'All grades' },
											{ value: 9, label: '9th grade' },
											{ value: 10, label: '10th grade' },
											{ value: 11, label: '11th grade' },
											{ value: 12, label: '12th grade' },
										]}
										defaultValue={this.state.adminGrade}
										containerStyle={homeScreenStyles.dropDown}
										itemStyle={{
											justifyContent: 'flex-start',
										}}
										dropDownStyle={{ backgroundColor: '#fafafa' }}
										onChangeItem={(item) => {
											this.setState({
												adminGrade: item.value,
											});
										}}
									/>
								</View>
								<ScrollView
									style={{
										marginBottom: 200,
										position: 'relative',
										zIndex: -1,
									}}
								>
									{studentView}
								</ScrollView>
							</View>
						) : (
							<View>{screenRender}</View>
						)}
					</View>
				) : (
					<LoadingAnimationScreen></LoadingAnimationScreen>
				)}
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
	searchBar: {
		fontSize: 16,
		width: (screenWidth * 6) / 10,
		padding: (screenWidth * 1) / 50,
		marginHorizontal: (screenWidth * 1) / 30,
		backgroundColor: '#F4F5F7',
		borderRadius: 20,
	},
	searchBarContainer: {
		flexDirection: 'row',
		width: screenWidth,
		backgroundColor: '#DDDDDD',
		paddingVertical: (screenWidth * 1) / 25,
	},
	dropDown: {
		marginRight: (screenWidth * 1) / 30,
		width: (screenWidth * 3) / 10,
		height: 40,
		borderRadius: 20,
		zIndex: 100,
	},
	profileContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		margin: (screenWidth * 1) / 30,
		marginBottom: 0,
		borderRadius: 5,
	},
	profilePic: {
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
		margin: (screenWidth * 1) / 30,
	},
	profileInfo: {
		width: (screenWidth * 5.5) / 10,
		justifyContent: 'center',
	},
	profileTextMain: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	profileTextSub: {
		fontSize: 14,
	},
	textContainer: {
		justifyContent: 'center',
	},
	ioniconsContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	ionicon: {
		marginVertical: 5,
	},
});
