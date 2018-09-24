import React, {Component, Fragment} from 'react';
import { Grid, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Card from '../../components/Card';
import Select from '../../components/Select';
import NewsSideNav from '../NewsSideNav/NewsSideNav';
import Info from '../../components/Info';

class Promote extends Component{
    render(){
        return(
            <Fragment>
                <Grid container style={{margin: '10px 0'}} justify='center'>
                    <Grid item sx={12} md={9}>
                        <Info />
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
                        Are You Thinking What We Thinking<br/>
                        Promoting your Song Online? – Why Not Bank On ONH.com.ng<br/><br/>

                        ONH.com.ng is a Most Visited News And Entertainment Website With A Highly Recognized Presence On All Social Media<br/><br/>

                        Are you a Musician, Record Label Owner or Artiste/Brand Manager?<br/><br/>

                        Message Us, Let’s Showcase your song on our Website and Experience the true effectiveness of Internet promotion<br/><br/>

                        Message – +234 808 891 2037 (Kenzy Blaq)<br/>
                        +234 907 692 6630 (Teecon)<br/><br/>

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

export default Promote;