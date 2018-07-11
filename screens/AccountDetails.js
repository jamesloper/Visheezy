import React, { Component } from 'react';
import { Alert, Text, ScrollView, View, StyleSheet } from 'react-native';
import moment from 'moment';
import formatNumber from '../util/formatNumber';

import Box from '../components/Box';
import Chart from '../components/Chart';
import ActionButton from '../components/ActionButton';
import { connect } from 'react-redux';
import { removeAccount } from '../actions/account-actions';

class AccountDetails extends Component {
	static navigationOptions = ({navigation}) => ({
		title: navigation.state.params.account.name,
		headerRight: (
			<ActionButton icon="delete" navigation={navigation}/>
		),
	});

	constructor(props) {
		super(props);
		this.state = {'historyData': []};
	}

	componentWillMount() {
		this.props.navigation.setParams({'onPress': this.pressRemoveAccount});
	}

	componentDidMount() {
		//this.updateHistory();
	}

	render() {
		const {account} = this.props.navigation.state.params;
		const {
			unpaidPayout,
			lastSeen,
			reportedHashrate,
			currentHashrate,
			averageHashrate,
			ethPerMin,
			usdPerMin,
			btcPerMin,
		} = account;
		const {historyData} = this.state;

		let lastSeenFriendly = moment(lastSeen).fromNow(true);

		return (
			<ScrollView style={style.view}>
				<View style={style.balanceContainer}>
					<Text>
						<Text style={style.balanceText}>{formatNumber(unpaidPayout, 5)}</Text>
						<Text style={style.meta}> Ξ</Text>
					</Text>
				</View>

				<View style={style.hashRatesContainer}>
					<Box title="Reported" text={reportedHashrate.toFixed(2)} units="MH/s"/>
					<Box title="Current" text={currentHashrate.toFixed(2)} units="MH/s"/>
					<Box title="Average" text={averageHashrate.toFixed(2)} units="MH/s"/>
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
						<Text style={style.earningsText}>
							<Text style={style.meta}>Ξ </Text>
							<Text>{formatNumber(ethPerMin * 60)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>Ξ </Text>
							<Text>{formatNumber(ethPerMin * 1440)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>Ξ </Text>
							<Text>{formatNumber(ethPerMin * 10080)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>Ξ </Text>
							<Text>{formatNumber(ethPerMin * 43200)}</Text>
						</Text>
					</View>
					<View>
						<Text style={style.earningsHeader}>USD</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>$ </Text>
							<Text>{formatNumber(usdPerMin * 60)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>$ </Text>
							<Text>{formatNumber(usdPerMin * 1440)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>$ </Text>
							<Text>{formatNumber(usdPerMin * 10080)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>$ </Text>
							<Text>{formatNumber(usdPerMin * 43200)}</Text>
						</Text>
					</View>
					<View>
						<Text style={style.earningsHeader}>BTC</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>฿ </Text>
							<Text>{formatNumber(btcPerMin * 60)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>฿ </Text>
							<Text>{formatNumber(btcPerMin * 1440)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>฿ </Text>
							<Text>{formatNumber(btcPerMin * 10080)}</Text>
						</Text>
						<Text style={style.earningsText}>
							<Text style={style.meta}>฿ </Text>
							<Text>{formatNumber(btcPerMin * 43200)}</Text>
						</Text>
					</View>
				</View>
				{/*<Chart data={historyData}/>*/}
			</ScrollView>
		);
	}

	updateHistory = () => {
		const {account} = this.props.navigation.state.params;
		const url = `https://api.ethermine.org/miner/${account.wallet}/history`;
		fetch(url).then(r => r.json()).then(response => {
			const historyData = response.data.map(r => ({
				'date': new Date(r.time * 1000),
				'reportedHashrate': r.reportedHashrate / 1e6,
				'currentHashrate': r.currentHashrate / 1e6,
				'averageHashrate': r.averageHashrate / 1e6,
				'activeWorkers': r.activeWorkers,
				'validShares': r.validShares,
				'staleShares': r.staleShares,
				'invalidShares': r.invalidShares,
			}));
			this.setState({'historyData': historyData});
		});
	};

	pressRemoveAccount = () => {
		Alert.alert('Remove Account', 'Are you sure?', [
			{text: 'Yes', onPress: this.removeAccount},
			{text: 'No'},
		]);
	};

	removeAccount = () => {
		const {removeAccount, navigation} = this.props;
		navigation.goBack();
		removeAccount(navigation.state.params.account.id);
	};
}

const style = StyleSheet.create({
	view: {flex: 1, backgroundColor: '#111'},
	wrapper: {paddingVertical: 10},
	text: {color: '#fff'},
	balanceContainer: {
		marginBottom: 16,
		backgroundColor: '#222',
		paddingVertical: 10,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
	balanceText: {fontSize: 24, color: '#fff', marginBottom: 10},
	hashRatesContainer: {flexDirection: 'row', marginHorizontal: 5, marginBottom: 10},
	earningsContainer: {flexDirection: 'row', padding: 5, justifyContent: 'space-between'},
	spacer: {fontSize: 16, color: 'transparent', paddingHorizontal: 5, paddingVertical: 2},
	earningsHeader: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		paddingHorizontal: 5,
		paddingVertical: 2,
		textAlign: 'right',
	},
	earningsText: {
		fontSize: 16,
		color: '#fff',
		paddingHorizontal: 5,
		paddingVertical: 2,
		textAlign: 'right',
	},
	meta: {color: 'rgba(255,255,255,.3)'},
});

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {removeAccount})(AccountDetails);