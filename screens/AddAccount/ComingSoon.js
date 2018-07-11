import React, { Component } from 'react';
import Placeholder from '../../components/Placeholder';

class ComingSoon extends Component {
	render() {
		return (
			<Placeholder
				icon="cog"
				title="Coming Soon"
				description="Support for Nicehash, Ethpool, etc are coming."
			/>
		);
	}
}

export default ComingSoon;