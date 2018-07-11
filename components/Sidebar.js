import React, { Component } from 'react';
import { Image, Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import DrawerItem from '../components/DrawerItem';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.pressSettings = this.pressSettings.bind(this);
	}

	render() {
		const menuItemsComponent = this.props.menuItems.map(item => {
			const onPress = () => this.props.navigation.navigate('Ethermine');
			return (
				<DrawerItem key={item.title} title={item.title} onPress={onPress}/>
			);
		});

		return (
			<View style={style.view}>
				<View style={style.header}>
					<Image source={require('../assets/icons/loading.png')} style={style.image}/>
				</View>
				<ScrollView>{menuItemsComponent}</ScrollView>
				<DrawerItem
					onPress={this.pressSettings}
					title="Settings"
				/>
			</View>
		);
	}

	pressSettings() {
		this.props.navigation.navigate('Settings');
	}
}

const paddingTop = Platform.select({ios: 20, android: StatusBar.currentHeight});
const style = {
	view: {flex: 1, backgroundColor: '#222', paddingTop: paddingTop},
	header: {padding: 15},
	image: {height: 44, width: 44, marginBottom: 10},
};

export default Sidebar;
