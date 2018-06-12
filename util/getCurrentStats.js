const getCurrentStats = (wallet) => {
	return fetch(`https://api.ethermine.org/miner/${wallet}/currentStats`)
	.then(r => r.json())
	.then(response => {
		const {
			activeWorkers,
			averageHashrate,
			btcPerMin,
			coinsPerMin,
			currentHashrate,
			invalidShares,
			lastSeen,
			reportedHashrate,
			staleShares,
			time,
			unconfirmed,
			unpaid,
			usdPerMin,
			validShares,
		} = response.data;

		return {
			'name': 'Ethermine',
			'type': 'ethermine',
			'wallet': wallet,
			'averageHashrate': (averageHashrate / 1000000),
			'currentHashrate': (currentHashrate / 1000000),
			'reportedHashrate': (reportedHashrate / 1000000),
			'activeWorkers': activeWorkers,
			'ethPerMin': coinsPerMin,
			'btcPerMin': btcPerMin,
			'usdPerMin': usdPerMin,
			'usdPerMonth': usdPerMin * 43800,
			'lastSeen': new Date(lastSeen * 1000),
			'validShares': validShares,
			'staleShares': staleShares,
			'invalidShares': invalidShares,
			'upTime': time,
			'unconfirmedPayout': unconfirmed / 1e18,
			'unpaidPayout': unpaid / 1e18,
		};
	});
};

export default getCurrentStats;