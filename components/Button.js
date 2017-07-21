import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default (props) => {
	var buttonStyle = {color:props.color || '#fff'};
	
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Text style={[style.title, buttonStyle]}>{props.title}</Text>
		</TouchableOpacity>
	);
};

var style = {
	title: {fontSize:16, color:'#fff', padding:10, textAlign:'center'},
};