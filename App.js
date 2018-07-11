import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Main from './screens/Main';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
	componentWillMount() {
		StatusBar.setBarStyle('light-content');
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={<AppLoading/>} persistor={persistor}>
					<View style={style.view}>
						<Main/>
					</View>
				</PersistGate>
			</Provider>
		);
	}
}

const style = {
	view: {flex: 1, backgroundColor: '#222'},
};

export default App;