import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { addAccount } from '../../actions/account-actions';
import getCurrentStats from '../../util/getCurrentStats';

import Button from '../../components/Button';
import ActionButton from '../../components/ActionButton';

class Ethermine extends Component {
	static defaultNavigationOptions = ({navigation}) => ({
		headerRight: <ActionButton navigation={navigation} icon="check"/>,
	});

	state = {'wallet': this.props.wallet};

	componentDidMount() {
		this.props.navigation.setParams({'onPress': this.submit});
	}

	render() {
		const {wallet} = this.state;

		return (
			<View style={style.view}>
				<View>
					<View style={style.inputContainer}>
						<TextInput
							underlineColorAndroid="transparent"
							style={style.input}
							placeholder="Enter your Ethermine address"
							value={wallet}
							onChangeText={val => this.setState({'wallet': val})}
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

	submit = () => {
		const {addAccount, navigation} = this.props;
		const {wallet} = this.state;

		if (!/[0-9A-Fa-f]{6}/g.test(wallet)) return Alert.alert('Please use the standard (hex) format');

		getCurrentStats(wallet).then(res => {
			addAccount(res);
			navigation.dispatch({
				type: 'Navigation/RESET',
				index: 0,
				actions: [{routeName: 'Tabs'}],
			});
		}).catch(err => {
			ToastAndroid.show(err.toString());
		});
	};

	demo = () => {
		this.setState({'wallet': '66caa27a6e99b8b2ab0f68fa956537ff975c6e0c'});
	};
}

const style = StyleSheet.create({
	view: {
		backgroundColor: '#111',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'space-around',
		padding: 10,
	},
	input: {color: '#111', fontSize: 16, height: 44, backgroundColor: '#fff', padding: 10, flex: 1},
	title: {color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10},
	inputContainer: {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 2},
});

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {addAccount})(Ethermine);