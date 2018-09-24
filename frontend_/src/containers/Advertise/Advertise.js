import React, {Component, Fragment} from 'react';
import { Grid, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Card from '../../components/Card';
import Select from '../../components/Select';
import NewsSideNav from '../NewsSideNav/NewsSideNav';

class Advertise extends Component{
    render(){
        return(
            <Fragment>
                <Grid container style={{margin: '10px 0'}} justify='center'>
                    <Grid item sx={12} md={9}>
                        <Grid container >
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
                        <Card style={{padding: 10, textAlign: 'center'}} >
                            <Typography variant="headline" style={{margin: '5px 0'}}>Welcome User</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>referral allowance = 1,000</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>read allowance = 5,000</Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>
                                <Link to='/withdrawal' style={{color: '#01579B', textDecoration: 'none'}} >MAKE WITHDRAWAL</Link>
                            </Typography>
                            <Typography variant='subheading' style={{margin: '5px 0'}}>LOGOUT</Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container style={{margin: '10px 0'}} justify='center'>
                    <Grid item sx={12} md={9}>
                        <Grid container justify='center'>
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/promote-music'>PROMOTE MUSIC</Link>|
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/advertise'>ADVERTISE</Link>|
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/login'>LOGIN</Link>|
                            <Link style={{textDecoration: 'none', color: 'red', margin: '0 10px', fontWeight: 'bold'}} to='/signup'>SIGNUP</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" >
                <Grid item sx={12} md={9}>
                    <Grid container >
                        <Grid item xs={12} md={8} style={{paddingRight: 5, boxSizing: 'border-box'}} >
                        Wouldn’t You Rather Bank With A Website With A High Potential, A Website With Over 100,000 Visitors Monthly. 
                        How High Presence On Social Media Will Give Your Band High And Well Advertised Brand<br/><br/>

                        Contact
                        +2348122304793<br/><br/>

                        INSTAGRAM: @ONHtv<br/>
                        TWITTER: @ONHtv                               
                        </Grid>
                        <NewsSideNav />
                    </Grid>
                </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default Advertise;