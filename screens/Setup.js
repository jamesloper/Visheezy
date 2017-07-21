import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Permissions, BarCodeScanner } from 'expo'
import Toast from 'react-native-root-toast';

import Button from '../components/Button';

var style = {
	view: {backgroundColor:'#222', flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'space-around', padding:10},
	text: {color:'#111', fontSize:16, height:44, backgroundColor:'#fff', padding:10, flexGrow:1},
	title: {color:'#fff', fontSize:24, fontWeight:'bold', marginBottom:10},
	barcode: {width:150, height:150},
	inputContainer: {flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#fff', borderRadius:2},
}

class Setup extends Component {
	constructor(props) {
		super(props);
		
		this.state = {wallet:this.props.wallet, canScan:false};
		
		this.submit = this.submit.bind(this);
		this.qr = this.qr.bind(this);
		this.demo = this.demo.bind(this);
	}
	
	submit() {
		const { wallet } = this.state;
		
		if (!/[0-9A-Fa-f]{6}/g.test(wallet)) return Toast.show('Please use the standard (hex) format', {shadow:false});
		this.props.onSubmit(wallet);
	}
	
	qr() {
		Permissions.askAsync(Permissions.CAMERA).then(status => {
			this.setState({canScan:(status == 'granted')});
		});
	}
	
	demo() {
		this.setState({wallet: '20c5E80278beC5E1D0Dc2E6878B74843a55999B2'});
		Toast.show('Demo address entered', {shadow:false});
	}
	
	render() {
		if (this.state.canScan) return (
			<BarCodeScanner
				onBarCodeRead={console.log}
				style={StyleSheet.absoluteFill}
			/>
		);

		return (
			<View style={style.view}>
				<View>
					<Text style={style.title}>Ethermine</Text>
					<View style={style.inputContainer}>
						<TextInput 
							underlineColorAndroid="transparent"
							style={style.text} 
							placeholder="Enter your Ethermine address" 
							value={this.state.wallet} 
							onChangeText={t => this.setState({wallet: t})}
						/>
						<Button 
							onPress={this.submit} 
							title="Submit" 
							color="#fff" 
						/>
					</View>
					<Button 
						onPress={this.demo} 
						title="Use Demo Address" 
						color="#666" 
					/>
				</View>
			</View>
		);
	}
}

export default Setup;