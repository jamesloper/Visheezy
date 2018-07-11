const formatNumber = (val, decimals = 2) => {
	const [whole, fraction] = val.toFixed(decimals).split('.');
	return parseInt(whole).toLocaleString() + '.' + fraction;
};

export default formatNumber;