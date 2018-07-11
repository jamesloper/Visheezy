import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Touchable = Platform.select({ios: TouchableOpacity, android: TouchableNativeFeedback});

const style = {
	iconContainer: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		paddingHorizontal: 16,
	},
};

const MenuButton = (props) => {
	return (
		<Touchable
			rippleColor="#666"
			rippleBorderless={true}
			onPress={() => props.navigation.navigate('DrawerOpen')}
		>
			<View style={style.iconContainer}>
				<Icon name="menu" size={24} color="#fff"/>
			</View>
		</Touchable>
	);
};

export default MenuButton;