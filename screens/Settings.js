import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';

var style = {
	view: {backgroundColor:'#111', flex:1, padding:10},
	thanks: {color:'rgba(255,255,255,.3)', fontSize:14, textAlign:'center', marginBottom:10},
}

class Setup extends Component {
	constructor(props) {
		super(props);		
	}
		
	render() {
		const { data, onLogout } = this.props.screenProps;
		const { settings } = data;
		
		const emailDisplay = settings.email || 'None';
		
		return (
			<ScrollView style={style.view}>
				<Text style={style.thanks}>{`Notification Email: ${emailDisplay}`}</Text>
				<Text style={style.thanks}>{`Payout Minimum: Ξ ${settings.minPayout}`}</Text>
				<Text style={style.thanks}>{"Thank you for purchasing Visheezy!"}</Text>
				<Button onPress={onLogout} title="Logout" color="#fff" />
			</ScrollView>
		);
	}
}

export default Setup;