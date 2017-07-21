import React, { Component } from 'react';
import { RefreshControl, Dimensions, StyleSheet, Text, ScrollView, View } from 'react-native';
import moment from 'moment';

import Box from '../components/Box';

function friendlyFormat(hashes) {
	return (hashes / 1000000).toFixed(2);
} 

class Status extends Component {
	constructor(props) {
		super(props);
		
		const { width } = Dimensions.get('window');
		
		this.state = {width: width};
	}
	
	render() {
		const { data, isRefreshing, onRefresh } = this.props.screenProps;
		const { settings, minerStats, ethPerMin, btcPerMin, usdPerMin } = data;
		const { width } = this.state;
		
		var ethMiningRate = (ethPerMin / 60000); // eth per ms
		
		var balance = (data.unpaid / 1000000000000000000);
		var remainingToPayout = (settings.minPayout - balance);

		var payoutDate = (remainingToPayout > 0) ? moment(Date.now() + (remainingToPayout / ethMiningRate)).fromNow() : 'now';
		var payoutProgress = (balance / settings.minPayout);
		
		const progressBarStyle = {width: (width - 20) * payoutProgress};
				
		return (
			<ScrollView 
				style={style.view}
		        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
				>
				<View style={style.balanceWrapper}>
					<View style={style.balanceContainer}>
						<Text style={style.balanceText}>{balance.toFixed(5)} <Text style={style.meta}>Ξ </Text></Text>
						
						<View style={style.payoutContainer}>
							<Text style={style.payoutInDays}>{`Payout ${payoutDate}`}</Text>
							<Text style={style.payoutInDays}>{(payoutProgress * 100).toFixed(2)}%</Text>
						</View>
						
						<View style={[style.progressBar, progressBarStyle]} />
					</View>
				</View>

				<View style={style.hashratesContainer}>
					<Box title="Reported" text={friendlyFormat(minerStats.reportedHashrate)} units="MH/s" />
					<Box title="Current" text={friendlyFormat(minerStats.currentHashrate)} units="MH/s" />
					<Box title="Average" text={friendlyFormat(minerStats.averageHashrate)} units="MH/s" />
				</View>
	
				<View style={style.earningsContainer}>
					<View>
						<Text style={style.spacer}>Period</Text>
						<Text style={style.earningsHeader}>Hour</Text>
						<Text style={style.earningsHeader}>Day</Text>
						<Text style={style.earningsHeader}>Week</Text>
						<Text style={style.earningsHeader}>Month</Text>
					</View>
					<View>
						<Text style={style.earningsHeader}>ETH</Text>
						<Text style={style.earningsText}><Text style={style.meta}>Ξ </Text>{(ethPerMin * 60).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>Ξ </Text>{(ethPerMin * 1440).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>Ξ </Text>{(ethPerMin * 10080).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>Ξ </Text>{(ethPerMin * 43200).toFixed(2)}</Text>
					</View>
					<View>
						<Text style={style.earningsHeader}>USD</Text>
						<Text style={style.earningsText}><Text style={style.meta}>$ </Text>{(usdPerMin * 60).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>$ </Text>{(usdPerMin * 1440).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>$ </Text>{(usdPerMin * 10080).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>$ </Text>{(usdPerMin * 43200).toFixed(2)}</Text>
					</View>
					<View>
						<Text style={style.earningsHeader}>BTC</Text>
						<Text style={style.earningsText}><Text style={style.meta}>฿ </Text>{(btcPerMin * 60).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>฿ </Text>{(btcPerMin * 1440).toFixed(2)}</Text>	
						<Text style={style.earningsText}><Text style={style.meta}>฿ </Text>{(btcPerMin * 10080).toFixed(2)}</Text>
						<Text style={style.earningsText}><Text style={style.meta}>฿ </Text>{(btcPerMin * 43200).toFixed(2)}</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}

var style = {
	view: {flex:1, backgroundColor:'#111'},
	wrapper: {paddingVertical:10},
	text: {color:'#fff'},
	
	// Balance Box
	balanceWrapper: {paddingTop:10, paddingHorizontal:10},
	balanceContainer: {marginBottom:10, paddingHorizontal:10, backgroundColor:'#222', borderRadius:2, paddingTop:10},
	balanceText: {fontSize:24, color:'#fff', marginBottom:10},
	progressBar: {backgroundColor:'#666', height:2},
	payoutContainer: {flexDirection:'row', justifyContent:'space-between'},
	payoutInDays: {color:'#fff', marginBottom:10},

	hashratesContainer: {flexDirection:'row', marginHorizontal:5, marginBottom:10},	
	
	earningsContainer: {flexDirection:'row', padding:5, justifyContent:'space-between'},
	spacer: {fontSize:16, color:'transparent', padding:5},
	earningsHeader: {fontSize:16, fontWeight:'bold', color:'#fff', padding:5, textAlign:'right'},
	earningsText: {fontSize:16, color:'#fff', padding:5, textAlign:'right'},

	meta: {color:'rgba(255,255,255,.3)'},
}

export default Status;