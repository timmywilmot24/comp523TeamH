import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
	SafeAreaView,
	Alert,
	Linking,
	Dimensions,
	TouchableHighlightBase,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../components/Header.js';
import { styles } from '../screens/MainScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingAnimationScreen from '../components/LoadingAnimationScreen.js';
import NetInfo from '@react-native-community/netinfo';

const screenWidth = Dimensions.get('window').width;

export default class NewsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			db: this.props.route.params.db,
			userID: this.props.route.params.userID,
			messages: [],
			dataGrabbed: false,
			length: 0,
			isAdmin: false,
			firstName: '',
			post: '',
			url: '',
			text: '',
			errorMessage: '',
			loadingDelete: false,
			search: '',
			online: false,
		};
	}

	async getData() {
		let online = await NetInfo.fetch();
		let connected = online.isConnected;
		if (connected) {
			this.state.db
				.database()
				.ref('news')
				.get()
				.then((news) => {
					let messages = this.state.messages;
					let length = 0;
					news.forEach((post) => {
						length += 1;
						messages.push({
							date: post.val().date,
							message: post.val().message,
							url: post.val().url,
							text: post.val().text,
						});
					});
					this.state.db
						.database()
						.ref('users/' + this.state.userID)
						.get()
						.then((data) => {
							this.setState({
								online: true,
								messages: messages,
								length: length,
								dataGrabbed: true,
								isAdmin:
									data.val().account === 'admin' ||
									data.val().account === 'masterAdmin',
								firstName: data.val().firstName,
							});
						});
				});
		} else {
			this.setState({ dataGrabbed: true });
		}
	}

	addMessage() {
		let date = new Date();
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		let yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}
		if (this.state.post === '') {
			this.setState({ errorMessage: 'Message must not be empty.' });
		} else if (this.state.url !== '' && !this.state.post.includes('!URL')) {
			this.setState({
				errorMessage:
					'URL given, but needs to be placed in message with !URL token',
			});
		} else if (this.state.url !== '') {
			Linking.canOpenURL(this.state.url).then((supported) => {
				if (supported) {
					this.state.db
						.database()
						.ref('news/' + this.state.length)
						.set({
							text: this.state.text,
							message: this.state.post,
							date: mm + '/' + dd + '/' + yyyy,
							url: this.state.url,
						})
						.then(() => {
							this.setState({
								dataGrabbed: false,
								messages: [],
								length: 0,
								text: '',
								post: '',
								url: '',
								errorMessage: '',
							});
						});
				} else {
					this.setState({
						errorMessage: 'Invalid URL, cannot go to ' + this.state.url,
					});
				}
			});
		} else {
			this.state.db
				.database()
				.ref('news/' + this.state.length)
				.set({
					text: this.state.text,
					message: this.state.post,
					date: mm + '/' + dd + '/' + yyyy,
					url: this.state.url,
				})
				.then(() => {
					this.setState({
						dataGrabbed: false,
						messages: [],
						length: 0,
						text: '',
						post: '',
						url: '',
						errorMessage: '',
					});
				});
		}
	}

	handleDelete(removeEle) {
		this.setState({
			loadingDelete: true,
		});
		let messages = [];
		for (let i = 0; i < this.state.messages.length; i++) {
			if (i !== removeEle) {
				messages.push(this.state.messages[i]);
			}
		}
		this.state.db
			.database()
			.ref('news')
			.set(messages)
			.then(() => {
				this.setState({
					messages: messages,
					length: this.state.length - 1,
					loadingDelete: false,
				});
			});
	}

	render() {
		let feed = [];
		if (!this.state.dataGrabbed) {
			this.getData();
		} else if (this.state.online) {
			let message = '';
			let messages = '';
			let text = '';
			for (let i = this.state.length - 1; i > -1; i--) {
				message = this.state.messages[i].message;
				messages = message.split('!URL');
				text = this.state.messages[i].text;
				if (
					text.toLowerCase().includes(this.state.search.toLowerCase()) ||
					message.toLowerCase().includes(this.state.search.toLowerCase()) ||
					(this.state.messages[i].url
						.toLowerCase()
						.includes(this.state.search.toLowerCase()) &&
						text === '')
				) {
					feed.push(
						// Style these as the individual messages
						<View key={i} style={newsScreenStyles.newsContainer}>
							<View style={newsScreenStyles.newsText}>
								<Text style={newsScreenStyles.message}>
									{messages.length == 2 ? (
										<Text>
											{messages[0]}
											<Text
												onPress={() =>
													Linking.openURL(this.state.messages[i].url)
												}
												style={{
													textDecorationLine: 'underline',
												}}
											>
												{this.state.messages[i].text === ''
													? this.state.messages[i].url
													: this.state.messages[i].text}
											</Text>
											{messages[1]}
										</Text>
									) : (
										<Text>{this.state.messages[i].message}</Text>
									)}
								</Text>
								<Text style={newsScreenStyles.date}>
									Posted on {this.state.messages[i].date}
								</Text>
							</View>
							{this.state.isAdmin && (
								<View style={newsScreenStyles.iconContainer}>
									<Pressable
										onPress={() => {
											Alert.alert(
												'Warning: Delete Message',
												'Are you sure that you want to delete this message?',
												[
													{
														text: 'Yes',
														onPress: () => this.handleDelete(i),
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
											name="trash"
											style={styles.icon}
											size={screenWidth * (1 / 25)}
											color={'#DC3545'}
										></Ionicons>
									</Pressable>
								</View>
							)}
						</View>
					);
				}
			}
		}
		return (
			<View style={styles.body}>
				{/*
         This view below is the header		*/}
				<Header title={'News'} />

				{/*
         This view below is the main		*/}
				{this.state.dataGrabbed &&
				!this.state.loadingDelete &&
				this.state.online ? (
					// This is when the data is received
					<View>
						<View style={newsScreenStyles.searchBarContainer}>
							<TextInput
								style={newsScreenStyles.searchBar}
								placeholder={'Search for a post...'}
								value={this.state.search}
								onChangeText={(search) => this.setState({ search })}
								label="Search"
							></TextInput>
						</View>
						<ScrollView>
							{this.state.isAdmin && (
								<View style={newsScreenStyles.newPost}>
									<TextInput
										style={newsScreenStyles.postMainText}
										placeholder={
											this.state.firstName + ', what do you want to post?'
										}
										placeholderTextColor={'rgba(183, 25, 20, 0.3)'}
										selectionColor={'#B71914'}
										value={this.state.post}
										multiline={true}
										numberOfLines={5}
										onChangeText={(post) => this.setState({ post })}
										label="newPost"
									/>
									<View style={newsScreenStyles.urlContainer}>
										<TextInput
											placeholder="Type URL here..."
											placeholderTextColor={'rgba(183, 25, 20, 0.3)'}
											selectionColor={'#B71914'}
											style={{
												marginLeft: 15,
												marginBottom: 5,
												color: '#B71914',
											}}
											value={this.state.url}
											onChangeText={(url) => this.setState({ url })}
											label="newURL"
										/>
										<TextInput
											placeholder="Optional URL text here..."
											placeholderTextColor={'rgba(183, 25, 20, 0.3)'}
											selectionColor={'#B71914'}
											style={{
												marginLeft: 15,
												color: '#B71914',
												marginTop: 5,
											}}
											value={this.state.text}
											onChangeText={(text) => this.setState({ text })}
											label="newURLText"
										/>
									</View>
									<Pressable
										onPress={() => this.addMessage()}
										style={newsScreenStyles.addButton}
									>
										<Text style={newsScreenStyles.buttonText}>
											Post message
										</Text>
									</Pressable>
									<Text
										style={{
											textAlign: 'center',
											marginVertical: 10,
											color: '#B71914',
										}}
									>
										{this.state.errorMessage}
									</Text>
								</View>
							)}

							<View style={{ marginBottom: screenWidth * 1.5 }}>{feed}</View>
						</ScrollView>
					</View>
				) : (
					// This is before we get the data
					<LoadingAnimationScreen
						online={this.state.online}
						dataLoaded={this.state.dataGrabbed}
					></LoadingAnimationScreen>
				)}
			</View>
		);
	}
}

const newsScreenStyles = StyleSheet.create({
	//put newScreen style here
	newsContainer: {
		backgroundColor: 'white',
		margin: 10,
		marginBottom: 0,
		flexDirection: 'row',
		borderRadius: 5,
	},
	date: {
		backgroundColor: 'white',
		color: '#B71914',
		marginBottom: 15,
		marginLeft: 15,
		opacity: 0.7,
		fontWeight: '300',
		fontSize: 14,
	},
	message: {
		backgroundColor: 'white',
		color: '#B71914',
		fontWeight: '400',
		fontSize: 20,
		margin: 15,
	},
	iconContainer: {
		justifyContent: 'flex-end',
		marginBottom: 10,
	},
	newsText: {
		width: screenWidth - 40,
	},
	newPost: {
		marginTop: 10,
		width: screenWidth - 20,
		alignSelf: 'center',
		borderRadius: 5,
		backgroundColor: 'white',
	},
	postMainText: {
		fontSize: 18,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		marginBottom: 32,
		color: '#B71914',
		minHeight: 100,
	},
	urlContainer: {
		marginHorizontal: 20,
		justifyContent: 'center',
		borderWidth: 0.25,
		borderColor: '#B71914',
		paddingVertical: 15,
		borderRadius: 8,
	},
	addButton: {
		backgroundColor: '#B71914',
		marginTop: 32,
		marginHorizontal: 20,
		justifyContent: 'center',
		paddingVertical: 15,
		borderRadius: 8,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
	},
	searchBar: {
		fontSize: 16,
		width: (screenWidth * 9) / 10,
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
		justifyContent: 'center',
	},
});
