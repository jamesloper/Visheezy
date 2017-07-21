import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { AsyncStorage, Platform, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator, DrawerNavigator, TabBarTop } from 'react-navigation';
import Toast from 'react-native-root-toast';

import Status from './screens/Status';
import Settings from './screens/Settings';
import Workers from './screens/Workers';
import Setup from './screens/Setup';

var Tabs = TabNavigator({
	Status: {screen: Status},
	Workers: {screen: Workers},
	Settings: {screen: Settings},
}, {
	tabBarComponent: TabBarTop,
	tabBarPosition: 'top',
	swipeEnabled: true,
	animationEnabled: true,
	tabBarOptions: {
		scrollEnabled: true,
		indicatorStyle: {backgroundColor:'#ff1744'},
		style: {backgroundColor:'#222'},
		tabStyle: {width:100},
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {data:null, wallet:null};
		
		this.renderApp = this.renderApp.bind(this);
		this.updateData = this.updateData.bind(this);
	}
	
	updateData(wallet) {
		this.setState({isRefreshing: true});

		fetch(`https://ethermine.org/api/miner_new/${wallet}`).then(res => {
			this.setState({isRefreshing: false});
			
			if (res.status == 200) {
				var data = JSON.parse(res._bodyInit);
					
				this.setState({
					data: data, 
					wallet: data.address, 
					onRefresh: () => {
						this.updateData(data.address);
					},
					onLogout: () => {
						AsyncStorage.removeItem('wallet');
						this.setState({data:false, wallet:null});
					},
				});
				
				AsyncStorage.setItem('wallet', data.address);
			} else {
				console.log(res);
				Toast.show(res._bodyInit, {shadow:false});
			}
		}).catch(err => {
			Toast.show(err.toString(), {shadow:false});
		});
	}
	
	componentWillMount() {
		StatusBar.setBarStyle('light-content');
	}
	
	componentDidMount() {		
		AsyncStorage.getItem('wallet').then(wallet => {
			this.setState({'wallet': wallet});
			if (wallet) this.updateData(wallet);
		});
	}
		
	renderApp() {
		const { wallet, data } = this.state;
		
		if (!wallet) return <Setup value={wallet} onSubmit={this.updateData} />
		if (data) return <Tabs onNavigationStateChange={null} screenProps={this.state} />
		return <AppLoading />;
	}
	
	render() {
		return <View style={style.app}>{<this.renderApp />}</View>;
	}
}

const style = {
	app: {backgroundColor:'#222', flex:1, paddingTop:Platform.select({ios:20})},
};

export default App;