import React, {Component, Fragment} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import SideNav from './SideNav';
import Landing from './Landing/Landing';
import User from './User/User';
import Post from './Post/Post';
import Comments from './Comment/Comment';
import Category from './Category/Category';
import Settings from './SiteSettings/SiteSettings';
import UserSettings from './UserSettings/UserSettings';
import Witdrawal from './Witdrawal/witdrawal';
import Cupon from './Cupon/Cupon';
import PostDetail from './Post/PostDetail';

class Admin extends Component{
    render(){
        return(
            <Fragment>
                <Grid container>
                    <SideNav />
                    <Switch>
                        <Route exact path={this.props.match.path+'/users'} component={User} />
                        <Route exact path={this.props.match.path+'/posts/:id'} component={PostDetail} />
                        <Route exact path={this.props.match.path+'/posts'} component={Post} />
                        <Route exact path={this.props.match.path+'/comments'} component={Comments} />
                        <Route exact path={this.props.match.path+'/category'} component={Category} />
                        <Route exact path={this.props.match.path+'/site-settings'} component={Settings} />
                        <Route exact path={this.props.match.path+'/user-settings'} component={UserSettings} />
                        <Route exact path={this.props.match.path+'/witdrawal'} component={Witdrawal} />
                        <Route exact path={this.props.match.path+'/cuponcodes'} component={Cupon} />
                        <Route exact path={this.props.match.path+'/'} component={Landing} />
                    </Switch>
                </Grid>
            </Fragment>
        )
    }
}

export default withRouter(Admin);