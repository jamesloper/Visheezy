import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Placeholder from '../components/Placeholder';
import Box from '../components/Box';

class Miners extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'data': [],
			'refreshing': false,
		};
	}

	componentDidMount() {
		// this.refresh();
	}

	render() {
		const {accounts} = this.props;
		const {refreshing, data} = this.state;

		return (
			<FlatList
				style={style.view}
				data={data}
				keyExtractor={r => r.worker}
				renderItem={this.renderItem}
				onRefresh={accounts.length ? this.refresh : null}
				refreshing={refreshing}
				ListEmptyComponent={<Placeholder
					icon="widgets"
					title="No Miners"
					description="Pull to refresh"
				/>}
			/>
		);
	}

	renderItem = ({item}) => {
		let lastActivity = moment(item.lastSeen * 1000).fromNow(true);

		let usdPerMin = 0;
		let usdPerSecond = (usdPerMin / 60);
		let mhPerSecond = (item.averageHashrate / 1000000);

		let friendlyCurrent = (item.currentHashrate / 1000000).toFixed(2);
		let friendlyAverage = (item.averageHashrate / 1000000).toFixed(2);
		let friendlyReported = (item.reportedHashrate / 1000000).toFixed(2);

		let revenue = Math.round(((usdPerSecond / mhPerSecond) * item.currentHashrate) * 2592000);

		return (
			<View style={style.row}>
				<View style={style.header}>
					<Text style={style.title}>{item.worker} ({item.account.name})</Text>
					<Text style={style.lastActivity}>{lastActivity}</Text>
				</View>
				<View style={style.hashesContainer}>
					<Box title="Current" text={friendlyCurrent} units="MH/s"/>
					<Box title="Reported" text={friendlyReported} units="MH/s"/>
					<Box title="Revenue" text={`$${revenue}`} units="/mo"/>
				</View>
			</View>
		);
	};

	refresh = () => {
		const {accounts} = this.props;

		const promises = [];
		accounts.forEach(account => {
			const url = `https://api.ethermine.org/miner/${account.wallet}/workers`;
			const promise = fetch(url).then(res => res.json()).then(r => r.data);
			promises.push(promise);
		});

		this.setState({'refreshing': true});
		Promise.all(promises).then(values => {
			// All workers get linked to original account they came from
			values.forEach((workers, i) => {
				workers.forEach(r => r.account = accounts[i]);
			});
			this.setState({'data': values[0], 'refreshing': false});
		}).catch(err => {
			ToastAndroid.show(err.toString());
			console.log('HTTP Error:', err);
		});
	};
}

const style = StyleSheet.create({
	view: {flex: 1, backgroundColor: '#111'},
	row: {marginBottom: 10},
	header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10},
	hashesContainer: {flexDirection: 'row', paddingHorizontal: 5},
	hashRate: {padding: 2, borderRadius: 2, backgroundColor: '#111', color: '#fff'},
	title: {color: '#fff', fontWeight: 'bold'},
	lastActivity: {color: '#999', fontSize: 12},
});

const mapStateToProps = ({accounts}) => ({accounts});

export default connect(mapStateToProps, null)(Miners);