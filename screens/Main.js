import { createStackNavigator } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Tabs from '../screens/Tabs';
import AddAccount from './AddAccount';
import AccountDetails from './AccountDetails';

export default createStackNavigator({
	Tabs: {screen: Tabs},
	AddAccount: {screen: AddAccount},
	AccountDetails: {screen: AccountDetails},
}, {
	navigationOptions: {
		title: 'Visheezy',
		headerTintColor: '#fff',
		headerStyle: {
			elevation: 0,
			backgroundColor: '#222',
			borderBottomWidth: 0,
		},
		headerTitleStyle: {
			color: '#fff',
			// fontFamily: 'monospace',
			fontWeight: 'bold',
			fontSize: 16,
		},
		cardStyle: {
			backgroundColor: '#111',
			borderWidth: 0,
		},
		headerBackTitle: null,
	},
	headerMode: 'screen',
	// transitionConfig: () => ({
	// 	screenInterpolator: sceneProps => {
	// 		return CardStackStyleInterpolator.forHorizontal(sceneProps);
	// 	},
	// }),
});