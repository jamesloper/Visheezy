import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Ethermine from './Ethermine';
import ComingSoon from './ComingSoon';

const AddAccount = createMaterialTopTabNavigator({
	Ethermine: Ethermine,
	Other: {screen: ComingSoon},
	// Nicehash: {screen: Ethermine},
	// Nanopool: {screen: Ethermine},
}, {
	tabBarPosition: 'top',
	navigationOptions: {
		title: 'Add Account',
	},
	tabBarOptions: {
		style: {backgroundColor: '#222', elevation: 0},
		tabStyle: {width: 120},
		indicatorStyle: {backgroundColor: '#ff1744'},
		scrollEnabled: true,
	},
	lazy: false,
});

export default AddAccount;