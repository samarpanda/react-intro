import React from 'react'

var Slide = React.createClass({
	getInitialState(){
		return {};
	},
	render(){
		const {id} = this.props
		return <div>{id}</div>;
	}
});

export default Slide;