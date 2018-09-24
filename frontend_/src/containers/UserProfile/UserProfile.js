import React, {Component} from 'react';
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

class UserProfile extends Component{
    render(){
        return (
            <Grid container justify='center' >
                <Grid lg={9} sx={12}>
                    <Typography variant="title">USER PROFILE</Typography>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>username</Grid>
                        <Grid xs={8}>bello123</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>name</Grid>
                        <Grid xs={8}>Bello Mayowa</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>email</Grid>
                        <Grid xs={8}>bmayowa25@gmail.com</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>referral code</Grid>
                        <Grid xs={8}>Qas12Fjd</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>referral allowance</Grid>
                        <Grid xs={8}>N2000</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>read allowance</Grid>
                        <Grid xs={8}>N5000</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid xs={4}>share allowance</Grid>
                        <Grid xs={8}>N1000</Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}} justify="space-between">
                        <Link to='/make-witdrawal' style={{textDecoration: 'none', color: '#0277BD'}}>MAKE WITDRAWAL</Link>
                        <Link to='/edit-profile' style={{textDecoration: 'none', color: '#FF6F00'}}>EDIT PROFILE</Link>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default UserProfile;