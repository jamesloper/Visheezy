import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Miners from './Miners';
import Accounts from './Accounts';

const Tabs = TabNavigator({
	Accounts: {screen: Accounts},
	Miners: {screen: Miners},
}, {
	navigationOptions: {
		title: null,
	},
	tabBarComponent: TabBarTop,
	tabBarPosition: 'top',
	swipeEnabled: true,
	tabBarOptions: {
		style: {backgroundColor: '#222', elevation: 0},
		indicatorStyle: {backgroundColor: '#ff1744'},
	},
	lazy: false,
});


export default Tabs;