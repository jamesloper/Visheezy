import React from 'react';
import { Text, View } from 'react-native';

export default (props) => {
	return (
		<View style={style.hashrateBox}>
			<Text style={style.hashrateTitle}>{props.title}</Text>
			<Text style={style.hashrate}>
				{props.text}
				{props.units ? <Text style={style.meta}> {props.units}</Text> : null}
			</Text>
		</View>
	);
};

const style = {
	hashrateBox: {flex: 1, backgroundColor: '#222', borderRadius: 2, marginHorizontal: 5, paddingVertical: 10},
	hashrateTitle: {fontSize: 16, paddingBottom: 10, fontWeight: 'bold', textAlign: 'center', color: '#fff'},
	hashrate: {fontSize: 14, textAlign: 'center', color: '#fff'},
	meta: {fontSize: 12, color: 'rgba(255,255,255,.3)'},
};