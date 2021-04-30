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

export default class Tips extends Component {
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
		let tipsRender = [];
		let freshmanTipRender = [];
		let sophomoreTipRender = [];
		let juniorTipRender = [];
		let seniorTipRender = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let tips = '';
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
						tips = track[subject]; //all grade
						for (let grade in tips) {
							//iterate through grades
							if (grade !== 'name') {
								tips = track[subject][grade]['tips'];
								for (let tip in tips) {
									if (grade == 9) {
										freshmanTipRender.push(
											<View
												key={tip + 'freshmantips'}
												style={tipsScreenStyles.regularTextContainer}
											>
												<Text key={tip + 'freshmantips'}>{tips[tip]}</Text>
											</View>
										);
									} else if (grade == 10) {
										sophomoreTipRender.push(
											<View
												key={tip + 'sophomoretips'}
												style={tipsScreenStyles.regularTextContainer}
											>
												<Text key={tip + 'sophomoretips'}>{tips[tip]}</Text>
											</View>
										);
									} else if (grade == 11) {
										juniorTipRender.push(
											<View
												key={tip + 'juniortips'}
												style={tipsScreenStyles.regularTextContainer}
											>
												<Text key={tip + 'juniortips'}>{tips[tip]}</Text>
											</View>
										);
									} else if (grade == 12) {
										seniorTipRender.push(
											<View
												key={tip + 'seniortips'}
												style={tipsScreenStyles.regularTextContainer}
											>
												<Text key={tip + 'seniortips'}>{tips[tip]}</Text>
											</View>
										);
									}
								}
							}
						}
					} else {
						tips = track[subject][year]['tips'];
						for (let tip in tips) {
							tipsRender.push(
								<View
									key={tip + 'tips'}
									style={tipsScreenStyles.regularTextContainer}
								>
									<Text key={tip + 'tips'}>{tips[tip]}</Text>
								</View>
							);
						}
					}
				}
			}
		}
		return (
			<View>
				<View style={tipsScreenStyles.backButtonContainer}>
					<Pressable
						style={tipsScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={tipsScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={tipsScreenStyles.backText}>Back</Text>
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
						containerStyle={tipsScreenStyles.dropDown}
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
				{this.state.year === 'All' ? (
					<View style={{ zIndex: -1 }}>
						<ScrollView>
							<View style={tipsScreenStyles.classSectionTitleContainer}>
								<Text style={tipsScreenStyles.classSectionTitle}>Freshman</Text>
							</View>
							<View style={tipsScreenStyles.tipsContainer}>
								<View>
									<Text style={tipsScreenStyles.title}>Tips</Text>
								</View>
								{freshmanTipRender}
							</View>
							<View style={tipsScreenStyles.classSectionTitleContainer}>
								<Text style={tipsScreenStyles.classSectionTitle}>
									Sophomore
								</Text>
							</View>
							<View style={tipsScreenStyles.tipsContainer}>
								<View>
									<Text style={tipsScreenStyles.title}>Tips</Text>
								</View>
								{sophomoreTipRender}
							</View>
							<View style={tipsScreenStyles.classSectionTitleContainer}>
								<Text style={tipsScreenStyles.classSectionTitle}>Junior</Text>
							</View>
							<View style={tipsScreenStyles.tipsContainer}>
								<View>
									<Text style={tipsScreenStyles.title}>Tips</Text>
								</View>
								{juniorTipRender}
							</View>
							<View style={tipsScreenStyles.classSectionTitleContainer}>
								<Text style={tipsScreenStyles.classSectionTitle}>Senior</Text>
							</View>
							<View
								style={[
									tipsScreenStyles.tipsContainer,
									{ marginBottom: screenWidth * 2 },
								]}
							>
								<View>
									<Text style={tipsScreenStyles.title}>Tips</Text>
								</View>
								{seniorTipRender}
							</View>
						</ScrollView>
					</View>
				) : (
					<View>
						<ScrollView>
							<View
								style={{ zIndex: -1 }}
								style={[
									tipsScreenStyles.tipsContainer,
									{ marginBottom: screenWidth },
								]}
							>
								<View>
									<Text style={tipsScreenStyles.title}>Tips</Text>
								</View>
								{tipsRender}
							</View>
						</ScrollView>
					</View>
				)}
			</View>
		);
	}
}

const tipsScreenStyles = StyleSheet.create({
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
