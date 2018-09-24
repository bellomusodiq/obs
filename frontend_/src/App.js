import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import Tab from './components/Tab';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from './containers/Admin/Admin';
import Home from './containers/Home/Home';
import PostDetail from './containers/PostDetail/PostDetail';
import UserProfile from './containers/UserProfile/UserProfile';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import EditProfile from './containers/EditProfile/EditProfile';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import Search from './containers/Search/Search';
import Promote from './containers/Promote/Promote';
import Advertise from './containers/Advertise/Advertise';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header />
            <Tab />
            <div style={{padding: '0 5px'}}>
              <Switch>
                <Route path='/admin-dashboard' component={Admin} />
                <Route path='/user-profile/:id' component={UserProfile} />
                <Route path='/edit-profile/' component={EditProfile} />
                <Route path='/reset-password/' component={ResetPassword} />
                <Route path='/advertise/' component={Advertise} />
                <Route path='/promote-music/' component={Promote} />
                <Route path='/admin-user/:id' component={UserProfile} />
                <Route path='/search' component={Search} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/post/:id' component={PostDetail} />
                <Route path='/' exact component={Home} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
