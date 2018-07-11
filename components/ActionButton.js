import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionButton = (props) => {
	const {navigation, icon} = props;

	const test = () => console.log('test!');

	return (
		<View style={style.container}>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.getParam('onPress', test)}
				children={<Icon name={icon} size={24} color="#fff"/>}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 16, backgroundColor: 'red'},
	button: {flex: 1, alignItems: 'center', justifyContent: 'space-around'},
});

export default withNavigation(ActionButton);