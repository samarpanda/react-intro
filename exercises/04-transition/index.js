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
		return (<div>
			<h1>Transition</h1>
			{
				this.state.slides.map((item, i) => {
				return <Slide id={item} key={i} />
				})
			}
		</div>);
	}
});

render(<Carousel/>, document.getElementById('app'))
// export default Carousel;