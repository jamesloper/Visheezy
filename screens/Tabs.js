import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import Miners from './Miners';
import Accounts from './Accounts';
import ActionButton from "../components/ActionButton";

const Tabs = createMaterialTopTabNavigator({
	Accounts: {screen: Accounts},
	Miners: {screen: Miners},
}, {
	tabBarOptions: {
		style: {backgroundColor: '#222', elevation: 0},
		indicatorStyle: {backgroundColor: '#ff1744'},
	},
});

Tabs.navigationOptions = {
	headerRight: <ActionButton icon="add" navigateTo="AddAccount"/>,
};

export default Tabs;