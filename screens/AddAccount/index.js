import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Ethermine from './Ethermine';
//import Nicehash from './Ethermine';

const AddAccount = TabNavigator({
	Ethermine: {screen: Ethermine},
	// Ethpool: {screen: Ethermine},
	// Nicehash: {screen: Ethermine},
	// Nanopool: {screen: Ethermine},
}, {
	tabBarComponent: TabBarTop,
	tabBarPosition: 'top',
	navigationOptions: {},
	tabBarOptions: {
		style: {backgroundColor: '#222', elevation: 0},
		tabStyle: {width: 120},
		indicatorStyle: {backgroundColor: '#ff1744'},
		scrollEnabled: true,
	},
	lazy: false,
});

AddAccount.navigationOptions = {
	title: 'Add Account',
};

export default AddAccount;