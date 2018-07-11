import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

let instance;

class FloatingActionButton extends Component {
	render() {
		const {icon, onPress} = this.props;
		if (!icon) return null;
		return (
			<View style={style.container}>
				<TouchableNativeFeedback
					onPress={onPress}
					background={TouchableNativeFeedback.Ripple('#111', false)}
					useForeground={true}
					style={style.ripple}
				>
					<Icon name={icon} size={24} color="#fff"/>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		height: 56,
		width: 56,
		borderRadius: 28,
		backgroundColor: '#333',
		position: 'absolute',
		right: 24,
		bottom: 24,
		elevation: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ripple: {
		borderRadius: 28,
	},
});

export default FloatingActionButton;