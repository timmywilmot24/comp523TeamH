import React, { Component } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class LoadingAnimationScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<View>
				{!this.props.dataLoaded ? (
					<View
						style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 40 }}
					>
						<ActivityIndicator size="large" color="#B71914" />
						<View style={{ paddingTop: 10 }}>
							<Text style={{ color: '#B71914', opacity: 0.5 }}>
								Hang tight. We're almost done.
							</Text>
						</View>
					</View>
				) : (
					<View
						style={{
							marginTop: (screenWidth * 1) / 10,
							width: (screenWidth * 6) / 14,
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						<Ionicons
							name="wifi"
							size={screenWidth * (6 / 14)}
							color={'#B71914'}
							style={{ marginTop: (screenWidth * 3) / 14 }}
						></Ionicons>
						<Text
							style={{ color: '#B71914', fontSize: 14, textAlign: 'center' }}
						>
							Currently offline
						</Text>
					</View>
				)}
			</View>
		);
	}
}
