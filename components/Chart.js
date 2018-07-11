import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

class Chart extends Component {
	render() {
		return (
			<View style={style.container} children={this.renderBody()}/>
		);
	}

	renderBody = () => {
		const {data} = this.props;
		if (!data || data.length === 0) return <ActivityIndicator/>;

		return (
			<View style={style.chart}>
				<View style={style.chartLabels}>
					<Text style={style.text}>Max</Text>
					<Text style={style.text}>Min</Text>
				</View>
				<FlatList
					flex={1}
					horizontal={true}
					initialNumToRender={200}
					contentContainerStyle={style.graph}
					data={data}
					renderItem={this.renderBar}
					keyExtractor={r => r.date.toString()}
				/>
			</View>
		);
	};

	renderBar = ({item}) => {
		const {
			activeWorkers,
			averageHashrate,
			currentHashrate,
			date,
			invalidShares,
			reportedHashrate,
			staleShares,
			validShares,
		} = item;

		const validSharesStyle = {height: validShares / 20, backgroundColor: 'green'};
		const staleSharesStyle = {height: staleShares / 20, backgroundColor: 'red'};
		return (
			<View style={style.bar}>
				<View style={[style.subBar, staleSharesStyle]}/>
				<View style={[style.subBar, validSharesStyle]}/>
			</View>
		);
	};
}

const style = StyleSheet.create({
	container: {height: 150, paddingHorizontal: 10},
	bar: {height: 150, width: 4, justifyContent: 'flex-end'},
	subBar: {width: 3},
	chart: {flex: 1, flexDirection: 'row'},
	chartLabels: {flex: 0, justifyContent: 'space-between', paddingRight: 10},
	text: {color: '#999'},
	graph: {flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'},
});

export default Chart;