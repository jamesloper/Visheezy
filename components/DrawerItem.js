import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const DrawerItem = (props) => {
	let textStyle = {color: '#fff', fontWeight: 'bold', fontSize: 14};
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={style.view}>
				<Text style={textStyle}>{props.title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const style = {
	view: {padding: 16},
};

export default DrawerItem;