import React from 'react'
import { render } from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

const Tabs = React.createClass({
  getInitialState(){
    return {
      activeTabIndex: 0
    };
  },
  showTabIndex(activeTabIndex){
    this.setState({
      activeTabIndex
    });
  },
  render(){
    const {data} = this.props
    const {activeTabIndex} = this.state

    const tabs = data.map((tab, index) => {
      const isActive = index === activeTabIndex
      const style = isActive ? styles.activeTab : styles.tab

      return (
        <div
        key={tab.id}
        className="Tab"
        style={style}
        onClick={()=>this.showTabIndex(index)}
        >{tab.label}</div>
      )
    })

    const activeTab = data[activeTabIndex]
    const content = activeTab && activeTab.content

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {content}
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render(){
    const data = this.props.countries.map(country => ({
      label: country.name,
      content: country.description
    }))
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={data} />
      </div>
    )
  }
})

const DATA = [
  { id: 1, name: 'Cybrilla', description: 'You guys are awesome. Thanks for hosting JSChannel meetup!' },
  { id: 2, name: 'Samar', description: 'React and Isomorphic Javascript' },
  { id: 3, name: 'Narendra', description: 'We are going to have an awesome Emberjs talk later today!' }
]

render(<App countries={DATA} />, document.getElementById('app'), function(){})
