import React from 'react'
import {render} from 'react-dom'
import {Motion, spring, TransitionMotion} from 'react-motion'

const Resize = React.createClass({
  getInitialState() {
    return {
      items: [{key: 'a', size: 50}, {key: 'b', size: 60}, {key: 'c', size: 100}],
    };
  },
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 50}, {key: 'b', size: 60}], // remove c.
    });
  },
  willLeave() {
    return {width: spring(0), height: spring(0)};
  },
  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
        {interpolatedStyles =>
          <div>
            {interpolatedStyles.map(config => {
              return <div key={config.key} style={{...config.style, border: '1px solid'}} />
            })}
          </div>
        }
      </TransitionMotion>
    );
  },
});

render(<Resize/>, document.getElementById('app'))
