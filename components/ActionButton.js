import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionButton = (props) => {
	const {navigation, icon} = props;

	return (
		<View style={style.container}>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.state.params.onPress()}
				children={<Icon name={icon} size={24} color="#fff"/>}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 16},
	button: {flex: 1, alignItems: 'center', justifyContent: 'space-around'},
});

export default ActionButton;