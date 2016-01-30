import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, Redirect, hashHistory} from 'react-router'
import Gravatar from './Gravatar'

const USERS = [
  { id:1, name: 'Samar Panda', email: 'samar.panda84@gmail.com'},
  { id:2, name: 'Santhosh Reddy', email: 'santhosh.mreddy@gmail.com'},
  { id:3, name: 'Chiranjit', email: 'ckhabra@gmail.com'}
]

function getUserByID(id){
  for (let i = 0; i < USERS.length; ++i)
    if (USERS[i].id === parseInt(id, 10))
      return USERS[i]
  return null
}

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.props.children}
      </div>
    )
  }
});

const Home = React.createClass({
  render(){
    const items = USERS.map((user)=>{
      return (
        <li key={user.email}>
          <Link to={`/profile/${user.id}`}>{user.name}</Link>
        </li>
      )
    })

    return (
      <div>
        <h2>Home</h2>
        <ul>{items}</ul>
      </div>
    )
  }
});

const Profile = React.createClass({
  render(){
    const { userID } = this.props.params
    const user = getUserByID(userID)

    if(user == null)
      return <p>User not found id {userID}</p>

    return (
      <div className="profile">
        <Gravatar email={user.email} /> {user.name}
      </div>
    )
  }
});

const NotFound = React.createClass({
  render(){
    return <h1>No matching routes</h1>
  }
});

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="profile/:userID" component={Profile}/>
      <Redirect from="/users/:userID" to="/profile/:userID" />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('app'))
