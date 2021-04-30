import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TabYear from '../components/TabYear.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
const screenWidth = Dimensions.get('window').width;

export default class CollegeTips extends Component {
	constructor(props) {
		super(props);

		this.state = {
			track: '',
			year: 'All',
			subject: 'Business',
		};
	}
	loadData() {
		const path = `${FileSystem.cacheDirectory}track`;
		FileSystem.readAsStringAsync(path).then((data) => {
			this.setState({ track: JSON.parse(data), dataLoaded: true });
		});
	}
	render() {
		let year = 0;
		let collegeRender = [];
		let freshmanCollegeTipRender = [];
		let sophomoreCollegeTipRender = [];
		let juniorCollegeTipRender = [];
		let seniorCollegeTipRender = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let college = '';
			year = this.state.year;
			switch (year) {
				case 'Freshman':
					year = 9;
					break;
				case 'Sophomore':
					year = 10;
					break;
				case 'Junior':
					year = 11;
					break;
				case 'Senior':
					year = 12;
					break;
				default:
					year = 0;
					break;
			}
			let track = this.state.track;
			for (let subject in track) {
				if (track[subject].name === this.state.subject) {
					if (year === 0) {
						college = track[subject]; //all grade
						for (let grade in college) {
							//iterate through grades
							if (grade !== 'name') {
								college = track[subject][grade]['college'];
								for (let collegeTip in college) {
									if (grade == 9) {
										freshmanCollegeTipRender.push(
											<View
												key={collegeTip + 'freshmanCollegetips'}
												style={collegeScreenStyles.regularTextContainer}
											>
												<Text key={collegeTip + 'freshmanCollegetips'}>
													{college[collegeTip]}
												</Text>
											</View>
										);
									} else if (grade == 10) {
										sophomoreCollegeTipRender.push(
											<View
												key={collegeTip + 'sophomoreCollegetips'}
												style={collegeScreenStyles.regularTextContainer}
											>
												<Text key={collegeTip + 'sophomoreCollegetips'}>
													{college[collegeTip]}
												</Text>
											</View>
										);
									} else if (grade == 11) {
										juniorCollegeTipRender.push(
											<View
												key={collegeTip + 'juniorCollegetips'}
												style={collegeScreenStyles.regularTextContainer}
											>
												<Text key={collegeTip + 'juniorCollegetips'}>
													{college[collegeTip]}
												</Text>
											</View>
										);
									} else if (grade == 12) {
										seniorCollegeTipRender.push(
											<View
												key={collegeTip + 'seniorCollegetips'}
												style={collegeScreenStyles.regularTextContainer}
											>
												<Text key={collegeTip + 'seniorCollegetips'}>
													{college[collegeTip]}
												</Text>
											</View>
										);
									}
								}
							}
						}
					} else {
						college = track[subject][year]['college'];
						for (let tip in college) {
							collegeRender.push(
								<View
									key={tip + 'collegeTip'}
									style={collegeScreenStyles.regularTextContainer}
								>
									<Text key={tip + 'collegeTip'}>{college[tip]}</Text>
								</View>
							);
						}
					}
				}
			}
		}
		return (
			<View>
				<View style={collegeScreenStyles.backButtonContainer}>
					<Pressable
						style={collegeScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={collegeScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={collegeScreenStyles.backText}>Back</Text>
					</Pressable>
				</View>
				<View>
					<TabYear
						setState={(value) => this.setState({ year: value })}
					></TabYear>
					<DropDownPicker
						items={[
							{ value: 'Business', label: 'Business' },
							{ value: 'LawPolitics', label: 'Law and Politics' },
							{ value: 'Theatre', label: 'Theatre and Film' },
							{ value: 'Journalism', label: 'Journalism' },
							{ value: 'NaturalScience', label: 'Natural Sciences' },
							{ value: 'Humanities', label: 'Humanities' },
							{ value: 'Technology', label: 'Technology' },
							{ value: 'Medicine', label: 'Medicine' },
						]}
						defaultValue={this.state.subject}
						containerStyle={collegeScreenStyles.dropDown}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						onChangeItem={(item) => {
							this.setState({
								subject: item.value,
							});
						}}
					/>
				</View>
				<View style={{ zIndex: -1 }}>
					{this.state.year === 'All' ? (
						<ScrollView>
							<View style={collegeScreenStyles.classSectionTitleContainer}>
								<Text style={collegeScreenStyles.classSectionTitle}>
									Freshman
								</Text>
							</View>
							<View style={collegeScreenStyles.tipsContainer}>
								<View>
									<Text style={collegeScreenStyles.title}>College Tips</Text>
								</View>
								{freshmanCollegeTipRender}
							</View>
							<View style={collegeScreenStyles.classSectionTitleContainer}>
								<Text style={collegeScreenStyles.classSectionTitle}>
									Sophomore
								</Text>
							</View>
							<View style={collegeScreenStyles.tipsContainer}>
								<View>
									<Text style={collegeScreenStyles.title}>College Tips</Text>
								</View>
								{sophomoreCollegeTipRender}
							</View>
							<View style={collegeScreenStyles.classSectionTitleContainer}>
								<Text style={collegeScreenStyles.classSectionTitle}>
									Junior
								</Text>
							</View>
							<View style={collegeScreenStyles.tipsContainer}>
								<View>
									<Text style={collegeScreenStyles.title}>College Tips</Text>
								</View>
								{juniorCollegeTipRender}
							</View>
							<View style={collegeScreenStyles.classSectionTitleContainer}>
								<Text style={collegeScreenStyles.classSectionTitle}>
									Senior
								</Text>
							</View>
							<View
								style={[
									collegeScreenStyles.tipsContainer,
									{ marginBottom: screenWidth * 2 },
								]}
							>
								<View>
									<Text style={collegeScreenStyles.title}>College Tips</Text>
								</View>
								{seniorCollegeTipRender}
							</View>
						</ScrollView>
					) : (
						<ScrollView>
							<View
								style={[
									collegeScreenStyles.tipsContainer,
									{ marginBottom: screenWidth * 2 },
								]}
							>
								<View>
									<Text style={collegeScreenStyles.title}>College Tips</Text>
								</View>
								{collegeRender}
							</View>
						</ScrollView>
					)}
				</View>
			</View>
		);
	}
}

const collegeScreenStyles = StyleSheet.create({
	backButtonContainer: {
		backgroundColor: '#DDDDDD',
		padding: screenWidth * (1 / 50),
		marginBottom: screenWidth * (1 / 50),
		height: screenWidth * (1 / 7),
		justifyContent: 'center',
	},
	buttonStuff: {
		flexDirection: 'row',
	},
	backIcon: {
		alignSelf: 'center',
	},
	backText: {
		alignSelf: 'center',
	},
	dropDown: {
		alignSelf: 'center',
		width: (screenWidth * 3) / 7,
		height: 40,
		borderRadius: 20,
		zIndex: 100,
		marginVertical: screenWidth * (1 / 50),
	},
	tipsContainer: {
		backgroundColor: 'white',
		padding: screenWidth * (1 / 25),
		width: screenWidth * (13 / 15),
		alignSelf: 'center',
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		marginBottom: screenWidth * (1 / 10),
	},
	titleContainer: {
		flexDirection: 'row',
		paddingVertical: screenWidth * (1 / 70),
		borderRadius: screenWidth * (1 / 70),
		marginBottom: screenWidth * (1 / 25),
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	title: {
		color: '#B71914',
		fontSize: 20,
		alignSelf: 'flex-start',
		marginBottom: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		fontWeight: 'bold',
	},
	regularTextContainer: {
		borderBottomColor: 'rgba(0, 0, 0, 0.2)',
		borderBottomWidth: 1,
		marginBottom: screenWidth * (1 / 30),
		paddingBottom: screenWidth * (1 / 30),
	},
	classSectionContainer: {
		marginBottom: 40,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	classSectionTitle: {
		color: '#B71914',
		fontWeight: 'bold',
		fontSize: screenWidth * (1 / 15),
		textAlign: 'center',
		marginVertical: screenWidth * (1 / 30),
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
});
