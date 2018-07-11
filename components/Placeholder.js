import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Placeholder = (props) => {
	const {icon, title, description} = props;

	return (
		<View style={style.view}>
			<Icon name={icon} size={48} color="#999"/>
			<Text style={style.title}>{title}</Text>
			<Text style={style.description}>{description}</Text>
		</View>
	);
};

const style = StyleSheet.create({
	view: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', paddingBottom: 16},
	title: {color: '#fff', fontWeight: 'bold'},
	description: {color: '#fff'},
});

export default Placeholder;