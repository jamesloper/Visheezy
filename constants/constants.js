import { StatusBar, Platform } from 'react-native';

export const headerStyle = Platform.select({
	android: {
		backgroundColor: '#222',
		elevation: 0,
		paddingTop: StatusBar.currentHeight,
		height: 56 + StatusBar.currentHeight,
	},
	ios: {
		backgroundColor: '#222',
		borderBottomWidth: 0,
	},
});