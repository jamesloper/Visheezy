import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default (props) => {
	let buttonStyle = {color: props.color || '#fff'};

	return (
		<TouchableOpacity onPress={props.onPress}>
			<Text style={[style.title, buttonStyle]}>{props.title}</Text>
		</TouchableOpacity>
	);
};

const style = {
	title: {fontSize: 16, color: '#fff', padding: 10, textAlign: 'center'},
};