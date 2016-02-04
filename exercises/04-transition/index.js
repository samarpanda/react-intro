import React from 'react'
import {render} from 'react-dom'
import {Motion, spring} from 'react-motion'

import Slide from './slide'

var Carousel = React.createClass({
	getInitialState(){
		return {
			slides: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
	},
	render(){
		console.log('Yo');
		return <div>
			<h1>Transition</h1>
		</div>
	}
});

render(<Carousel/>, document.getElementById('app'))
// export default Carousel;