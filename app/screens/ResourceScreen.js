import React, { Component } from 'react';
import {
	Text,
	ScrollView,
	View,
	StyleSheet,
	Pressable,
	Dimensions,
	Linking,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
const screenWidth = Dimensions.get('window').width;

export default class ResourceScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataLoaded: false,
			resources: {},
			isAdmin: false,
			addResource: false,
			addText: '',
			addURL: '',
			addResourceError: '',
		};
	}

	goToURL(url) {
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log('Cannot go to ' + url);
			}
		});
	}

	handleDelete(id) {
		this.props.route.params.db
			.database()
			.ref('resources/' + id)
			.remove()
			.then(() => {
				this.setState({ dataLoaded: false });
			});
	}

	newResource(text, url, id) {
		return (
			<View key={id}>
				{this.state.isAdmin ? (
					<View>
						<Pressable onPress={() => this.goToURL(url)}>
							<Text>{text}</Text>
						</Pressable>
						<Pressable onPress={() => this.handleDelete(id)}>
							<Text>Delete Resource</Text>
						</Pressable>
					</View>
				) : (
					<View style={resourcesScreenStyles.resourceButton}>
						<Pressable onPress={() => this.goToURL(url)}>
							<Text style={resourcesScreenStyles.resourceButtonText}>
								{text}
							</Text>
						</Pressable>
					</View>
				)}
			</View>
		);
	}

	loadData() {
		this.props.route.params.db
			.database()
			.ref('resources')
			.get()
			.then((data) => {
				this.props.route.params.db
					.database()
					.ref('users/' + this.props.route.params.userID + '/account')
					.get()
					.then((admin) => {
						this.setState({
							isAdmin: admin.val() === 'admin' || admin.val() === 'masterAdmin',
							resources: data,
							dataLoaded: true,
						});
					});
			});
	}

	handleAddResource() {
		if (this.state.addText === '') {
			this.setState({ addResourceError: 'Resource name must not be empty.' });
		} else if (this.state.addURL === '') {
			this.setState({
				addResourceError: 'No URL is given',
			});
		} else {
			Linking.canOpenURL(this.state.addURL).then((supported) => {
				if (supported) {
					this.props.route.params.db
						.database()
						.ref('resources')
						.push({
							text: this.state.addText,
							url: this.state.addURL,
						})
						.then(() => {
							this.setState({
								addResource: false,
								addText: '',
								addURL: '',
								addResourceError: '',
								dataLoaded: false,
							});
						});
				} else {
					this.setState({
						addResourceError:
							'Invalid URL, ' + this.state.addURL + ' does not exist.',
					});
				}
			});
		}
	}

	render() {
		let resources = [];
		if (!this.state.dataLoaded) {
			this.loadData();
		} else {
			let info = '';
			for (let resource in this.state.resources.val()) {
				info = this.state.resources.val()[resource];
				resources.push(this.newResource(info.text, info.url, resource));
			}
		}
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'Resources'} />
				{/*
         This view below is the main		*/}
				{this.state.dataLoaded ? (
					<ScrollView style={styles.main}>
						{/*This is the consultation button */}
						<Pressable
							style={resourcesScreenStyles.consultationContainer}
							onPress={() =>
								this.goToURL(
									'https://missionscholarship.org/ola/services/video-chat-kyndall-program-consultation#d4f66cf5-2682-4fc6-b186-3bdfa068ece3'
								)
							}
						>
							<Ionicons
								style={resourcesScreenStyles.icon}
								name="calendar"
								size={25}
								color={'white'}
							/>
							<Text style={resourcesScreenStyles.consultationText}>
								Consultation
							</Text>
						</Pressable>
						{/*Other resources*/}
						<View style={resourcesScreenStyles.resourcesContainer}>
							{resources}
						</View>
						{this.state.isAdmin && (
							<View>
								{this.state.addResource ? (
									<View>
										<TextInput
											placeholder="Resource name here"
											value={this.state.addText}
											onChangeText={(addText) => this.setState({ addText })}
											label="newResourceText"
										/>
										<TextInput
											placeholder="Resource URL here"
											value={this.state.addURL}
											onChangeText={(addURL) => this.setState({ addURL })}
											label="newResourceURL"
										/>
										<Text>{this.state.addResourceError}</Text>
										<Text
											onPress={() =>
												this.setState({
													addResource: false,
													addText: '',
													addURL: '',
													addResourceError: '',
												})
											}
										>
											Cancel
										</Text>
										<Text onPress={() => this.handleAddResource()}>
											Add new resource
										</Text>
									</View>
								) : (
									<View>
										<Text onPress={() => this.setState({ addResource: true })}>
											Add Resource
										</Text>
									</View>
								)}
							</View>
						)}
					</ScrollView>
				) : (
					<View style={styles.main}></View>
				)}
			</View>
		);
	}
}

const resourcesScreenStyles = StyleSheet.create({
	//put style here
	consultationContainer: {
		backgroundColor: '#B71914',
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 20,
		marginBottom: 20,
		alignSelf: 'center',
		borderRadius: 8,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: screenWidth * (12 / 15),
	},
	consultationText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
	},
	icon: {
		alignSelf: 'center',
		marginRight: 7,
	},
	resourcesContainer: {
		alignSelf: 'center',
		width: screenWidth * (12 / 15),
	},
	resourceButton: {
		backgroundColor: '#B71914',
		marginBottom: 20,
		borderRadius: 8,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
	},
	resourceButtonText: {
		color: 'white',
		textAlign: 'center',
		padding: '3%',
		fontSize: 16,
	},
});
