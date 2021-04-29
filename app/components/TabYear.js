import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;

export default class Classes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			year: 'All',
		};
	}

	changeYear(grade) {
		this.setState({
			year: grade,
		});
		this.props.setState(grade);
	}

	render() {
		return (
			<View>
				{(() => {
					switch (this.state.year) {
						case 'Freshman':
							return (
								<View style={styles.classYearButtonsContainer}>
									<TouchableOpacity
										style={[
											styles.classYearButton,
											styles.classYearButtonActive,
										]}
									>
										<Text>Freshman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Sophomore')}
									>
										<Text>Sophomore</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Junior')}
									>
										<Text>Junior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Senior')}
									>
										<Text>Senior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('All')}
									>
										<Text>All</Text>
									</TouchableOpacity>
								</View>
							);
						case 'Sophomore':
							return (
								<View style={styles.classYearButtonsContainer}>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Freshman')}
									>
										<Text>Freshman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.classYearButton,
											styles.classYearButtonActive,
										]}
									>
										<Text>Sophomore</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Junior')}
									>
										<Text>Junior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Senior')}
									>
										<Text>Senior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('All')}
									>
										<Text>All</Text>
									</TouchableOpacity>
								</View>
							);
						case 'Junior':
							return (
								<View style={styles.classYearButtonsContainer}>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Freshman')}
									>
										<Text>Freshman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Sophomore')}
									>
										<Text>Sophomore</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.classYearButton,
											styles.classYearButtonActive,
										]}
									>
										<Text>Junior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Senior')}
									>
										<Text>Senior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('All')}
									>
										<Text>All</Text>
									</TouchableOpacity>
								</View>
							);
						case 'Senior':
							return (
								<View style={styles.classYearButtonsContainer}>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Freshman')}
									>
										<Text>Freshman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Sophomore')}
									>
										<Text>Sophomore</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Junior')}
									>
										<Text>Junior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.classYearButton,
											styles.classYearButtonActive,
										]}
									>
										<Text>Senior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('All')}
									>
										<Text>All</Text>
									</TouchableOpacity>
								</View>
							);
						default:
							return (
								<View style={styles.classYearButtonsContainer}>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Freshman')}
									>
										<Text>Freshman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Sophomore')}
									>
										<Text>Sophomore</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Junior')}
									>
										<Text>Junior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.classYearButton}
										onPress={() => this.changeYear('Senior')}
									>
										<Text>Senior</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.classYearButton,
											styles.classYearButtonActive,
										]}
									>
										<Text>All</Text>
									</TouchableOpacity>
								</View>
							);
					}
				})()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	classYearButtonsContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	classYearButton: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		marginHorizontal: 2.5,
	},
	classYearButtonActive: {
		backgroundColor: 'gray',
	},
});
