import React, { Component, Fragment } from "react";
import { Grid, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import { connect } from "react-redux";
import axios from 'axios';

class Info extends Component{
    state = {
        user: null,
    }
    componentDidMount = () => {
        if(this.props.auth){
            axios.get('http://localhost:8000/api/users/'+this.props.auth.id+'/')
            .then(({data}) => {
                this.setState({user: data})
            })
        }
    }
    
    render(){
        let userInfo = null;
        if(this.state.user){
            const {user} = this.state;
            userInfo = (
                <Fragment >
                    {this.props.auth && (!this.props.auth.isAdmin)?
                <Grid container style={{margin: '10px 0'}} justify='center'>
                    <Grid item sx={12} md={9}>
                        <Card style={{padding: 10, textAlign: 'center'}} >
                            <Typography variant="headline" style={{margin: '5px 0'}}>Welcome {user.username}</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>referral allowance = {user.referral_allowance}</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>read allowance = {user.read_allowance}</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>comment allowance = {user.comment_allowance}</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>refferal code = {user.referral_code}</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>
                                <Link to='/withdrawal' style={{color: '#01579B', textDecoration: 'none'}} >MAKE WITHDRAWAL</Link>
                            </Typography>
                            <Typography variant='subheading' 
                            onClick={this.props.logout}
                            style={{margin: '5px 0', color: '#F44336', cursor: 'pointer'}}>LOGOUT</Typography>
                        </Card>
                    </Grid>
                </Grid>
                :null}
                </Fragment>
            )
        }
        return (
            <Fragment>
                 <Grid container justify='center' >
                    <Grid sx={12} md={4}>
                        <Select />
                    </Grid>
                    <Grid sx={12} md={4}>
                        <form onSubmit={() => alert('working')}>
                            <input type="text" required placeholder='Search' 
                            className='searchInput' />
                        </form>
                    </Grid>
                </Grid>
                {userInfo}
                <Grid container style={{margin: '10px 0'}} justify='center'>
                    <Grid item sx={12} md={9}>
                        <Grid container justify='center'>
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/promote-music'>PROMOTE MUSIC</Link>|
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/advertise'>ADVERTISE</Link>|
                            {!this.props.auth?
                            <Fragment>
                                <Link 
                                style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}}
                                to='/login'>LOGIN</Link>|
                            </Fragment>
                            :null}
                            {!this.props.auth?
                                <Fragment>
                                    <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/signup'>SIGNUP</Link>
                                </Fragment>    
                            :null}
                            {this.props.auth?
                                <Fragment>
                                    <span onClick={this.props.logout}
                                    style={{textDecoration: 'none', 
                                    color: 'red', margin: '0 10px',
                                    cursor: 'pointer',
                                     fontWeight: 'bold'}}>LOGOUT</span>
                                </Fragment>    
                            :null}
                            </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logout: () => dispatch({type: 'LOG_OUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);