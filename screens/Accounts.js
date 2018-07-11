import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, View, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Placeholder from '../components/Placeholder';
import ActionButton from '../components/ActionButton';

import formatNumber from '../util/formatNumber';
import moment from 'moment';
import { connect } from 'react-redux';
import { addAccount, refreshAccounts } from '../actions/account-actions';
import getCurrentStats from '../util/getCurrentStats';

class Accounts extends Component {
	constructor(props) {
		super(props);
		this.state = {'refreshing': false};
	}

	componentWillMount() {
		const {navigation} = this.props;
		navigation.setParams({'onPress': () => navigation.navigate('AddAccount')});
	}

	render() {
		const {accounts} = this.props;
		const {refreshing} = this.state;

		return (
			<View flex={1}>
				{accounts.length ? (
					<FlatList
						data={accounts}
						style={style.view}
						renderItem={this.renderAccount}
						keyExtractor={r => r.id}
						onRefresh={accounts.length ? this.refresh : null}
						refreshing={refreshing}
					/>
				) : (
					<Placeholder
						icon="trending-up"
						title="No Accounts"
						description="Press the add button to get started"
					/>
				)}
			</View>
		);
	}

	renderAccount = ({item}) => {
		const {
			unpaidPayout,
			lastSeen,
			reportedHashrate,
			currentHashrate,
			averageHashrate,
			usdPerMonth,
		} = item;


		const lastSeenFriendly = moment(lastSeen).fromNow(true);
		const usdPerMonthFriendly = formatNumber(usdPerMonth);

		return (
			<TouchableHighlight
				onPress={this.pressAccount.bind(this, item)}
				underlayColor="#333"
			>
				<View style={style.row}>
					<View style={style.header}>
						<Text style={style.title}>{item.name}</Text>
						<View style={style.headerRight}>
							<Text style={style.lastSeen}>{lastSeenFriendly}</Text>
							<Icon name="keyboard-arrow-right" size={24} color="#999"/>
						</View>
					</View>
					<View style={style.box}>
						<View style={style.balanceContainer}>
							<Text style={style.balanceText}>
								<Text>{unpaidPayout.toFixed(5)}</Text>
								<Text style={style.meta}> Ξ</Text>
							</Text>
							<Text style={style.profitText}>
								<Text>${usdPerMonthFriendly}</Text>
								<Text style={style.mhs}> / mo</Text>
							</Text>
						</View>
						<View style={style.hashrateContainer}>
							<Text style={style.hashrate}>
								{reportedHashrate.toFixed(2)}
								<Text style={style.mhs}> MH/s</Text>
							</Text>
							<Text style={style.hashrate}>
								{currentHashrate.toFixed(2)}
								<Text style={style.mhs}> MH/s</Text>
							</Text>
							<Text style={style.hashrate}>
								{averageHashrate.toFixed(2)}
								<Text style={style.mhs}> MH/s</Text>
							</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	};

	pressAccount = (account) => {
		const {navigation} = this.props;
		navigation.navigate('AccountDetails', {account});
	};

	refresh = () => {
		const {accounts, refreshAccounts} = this.props;

		const promises = accounts.map(account => getCurrentStats(account.wallet));
		Promise.all(promises).then(res => {
			refreshAccounts(res);
		}).catch(err => {
			ToastAndroid.show(err.toString());
		});
	};
}

const style = StyleSheet.create({
	view: {backgroundColor: '#111', flex: 1},
	row: {padding: 10},
	header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
	headerRight: {flexDirection: 'row', alignItems: 'center'},
	title: {color: '#fff', fontWeight: 'bold', marginBottom: 10},
	lastSeen: {color: '#999', fontSize: 12},
	box: {
		backgroundColor: '#222',
		borderRadius: 4,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	balanceContainer: {},
	hashrateContainer: {paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: '#333'},
	balanceText: {fontSize: 24, color: '#fff', marginBottom: 10},
	meta: {color: 'rgba(255,255,255,.3)'},
	hashrate: {color: '#fff'},
	mhs: {color: 'rgba(255,255,255,.3)', fontSize: 12},
	profitText: {color: '#fff'},
});

const mapStateToProps = ({accounts}) => ({accounts});

export default connect(mapStateToProps, {addAccount, refreshAccounts})(Accounts);