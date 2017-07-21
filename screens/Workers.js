import React, { Component } from 'react';
import { RefreshControl, Text, ListView, View } from 'react-native';
import moment from 'moment';

import Box from '../components/Box';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Status extends Component {
	constructor(props) {
		super(props);
		const { data } = this.props.screenProps;
		
		const workers = Object.keys(data.workers).map(k => data.workers[k]);
		
		this.state = {
			'dataSource': ds.cloneWithRows(workers),
			'time': Date.now(),
		};
		
		this.renderRow = this.renderRow.bind(this);
	}
	
	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({'time': Date.now()});
		}, 10000);
	}
	
	componentDidUnMount() {
		clearInterval(this.timer);
	}
	
	render() {
		const { onRefresh, isRefreshing, data } = this.props.screenProps;
		const { address } = data;
		
		return (
			<ListView
		        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
				style={style.view}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				enableEmptySections={true}
				/>
		);
	}
	
	renderRow(item, s, i) {
		const { data } = this.props.screenProps;
		const { minerStats, usdPerMin } = data;

		var index = parseInt(i) + 1;
		var lastActivity = moment(item.workerLastSubmitTime * 1000).fromNow(true);
		
		var currentHashrate = item.hashrate.replace(' MH/s', '');
		var reportedHashrate = item.reportedHashRate.replace(' MH/s', '');		
		
		var usdPerSecond = (usdPerMin / 60);
		var mhPerSecond = (minerStats.averageHashrate / 1000000);
						
		var revenue = ((usdPerSecond / mhPerSecond) * currentHashrate) * 2592000;
		
		return (
			<View style={style.row}>
				<View style={style.header}>
					<Text style={style.title}>{item.worker}</Text>
					<Text style={style.lastActivity}>{lastActivity}</Text>
				</View>
				<View style={style.hashesContainer}>
					<Box title="Current" text={currentHashrate} units="MH/s" />
					<Box title="Reported" text={reportedHashrate} units="MH/s" />
					<Box title="Revenue" text={`$${revenue.toFixed(2)}`} units="/mo" />
				</View>
			</View>
		);
	}
}

var style = {
	view: {flex:1, backgroundColor:'#111'},
	row: {marginBottom:10},
	header: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10},
	hashesContainer: {flexDirection:'row', paddingHorizontal:5},
	hashrate: {padding:2, borderRadius:2, backgroundColor:'#111', color:'#fff'},
	title: {color:'#fff', fontWeight:'bold', fontSize:16},
	text: {color:'#fff', fontSize:16},
	lastActivity: {color:'#999', fontSize:12},
}

export default Status;