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

export default class Extra extends Component {
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
		let extraRender = [];
		let optionRender = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let extra = '';
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
						extra = track[subject]; //all grade
					} else {
						extra = track[subject][year]['activities'];
						let options = extra['options'];
						let note1 = extra['notes'];
						let note2 = extra['notes2'];
						extraRender.push(
							<View key={year + 'extraNote1'}>
								<Text key={year + 'extraNote1'}>{note1}</Text>
							</View>
						);
						extraRender.push(
							<View key={year + 'extraNote2'}>
								<Text key={year + 'extraNote2'}>{note2}</Text>
							</View>
						);

						for (let option in options) {
							optionRender.push(
								<View key={option + 'option'}>
									<Text key={option + 'option'}>{options[option]}</Text>
								</View>
							);
						}
					}
				}
			}
		}
		return (
			<View>
				<View style={extraScreenStyles.backButtonContainer}>
					<Pressable
						style={extraScreenStyles.buttonStuff}
						onPress={() => this.props.setState(false)}
					>
						<Ionicons
							style={extraScreenStyles.backIcon}
							size={25}
							name="caret-back"
						></Ionicons>
						<Text style={extraScreenStyles.backText}>Back</Text>
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
						containerStyle={extraScreenStyles.dropDown}
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
				<View>{optionRender}</View>
				<View>{extraRender}</View>
			</View>
		);
	}
}

const extraScreenStyles = StyleSheet.create({
	backButtonContainer: {
		backgroundColor: '#DDDDDD',
		padding: screenWidth * (1 / 50),
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
		marginRight: (screenWidth * 1) / 30,
		width: (screenWidth * 3) / 10,
		height: 40,
		borderRadius: 20,
		zIndex: 100,
	},
	extraContainer: {
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
		marginTop: screenWidth * (1 / 9),
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
	titlesIcons: {
		alignSelf: 'center',
	},
	title: {
		color: '#B71914',
		marginLeft: screenWidth * (1 / 70),
		fontSize: 20,
		alignSelf: 'center',
	},
	regularTextContainer: {
		borderBottomColor: 'rgba(0, 0, 0, 0.2)',
		borderBottomWidth: 1,
		marginBottom: screenWidth * (1 / 30),
		paddingBottom: screenWidth * (1 / 30),
	},
	subtitle: {
		color: '#B71914',
		marginVertical: screenWidth * (1 / 70),
		fontSize: 15,
	},
	noteContainers: {
		padding: screenWidth * (1 / 25),
		width: '100%',
		alignSelf: 'center',
		marginBottom: screenWidth * (1 / 40),
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		backgroundColor: '#F6931D',
	},
});
