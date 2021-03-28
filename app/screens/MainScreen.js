import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen.js';
import ResourceScreen from './ResourceScreen.js';
import QuizScreen from './QuizScreen.js';
import NewsScreen from './NewsScreen.js';
import SettingsScreen from './SettingsScreen.js';

//const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class MainScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// Creates a Stack Navigator to navigate among 5 tabs
	// Can use this structure with NavBar feature
	render() {
		/* This is how we would get information
    let userID = this.props.route.params.uid;
    let db = this.props.route.params.firebase;
    db.database()
      .ref("users/" + userID)
      .get()
      .then((data) => {
        console.log(data);
      });
    */
		let params = {
			db: this.props.route.params.firebase,
			userID: this.props.route.params.uid,
		};
		return (
			<NavigationContainer independent={true}>
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let iconName;
							size = 28;
							if (route.name === 'Home') {
								iconName = 'home';
							} else if (route.name === 'Resources') {
								iconName = 'briefcase';
							} else if (route.name === 'Quiz') {
								iconName = 'checkbox';
							} else if (route.name === 'News') {
								iconName = 'megaphone';
							} else if (route.name === 'Settings') {
								iconName = 'settings';
							}

							// You can return any component that you like here!
							return <Ionicons name={iconName} size={size} color={color} />;
						},
					})}
					tabBarOptions={{
						activeTintColor: '#B71914',
						inactiveTintColor: 'black',
					}}
				>
					<Tab.Screen
						name="Home"
						initialParams={params}
						component={HomeScreen}
					></Tab.Screen>
					<Tab.Screen
						name="Resources"
						initialParams={params}
						component={ResourceScreen}
					></Tab.Screen>
					<Tab.Screen
						name="Quiz"
						initialParams={params}
						component={QuizScreen}
					></Tab.Screen>
					<Tab.Screen
						name="News"
						initialParams={params}
						component={NewsScreen}
					></Tab.Screen>
					<Tab.Screen
						name="Settings"
						initialParams={params}
						component={SettingsScreen}
					></Tab.Screen>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}

export const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#F6931D',
	},
	main: {
		marginTop: 10,
		flex: 1,
		backgroundColor: '#F6931D',
	},
});
