import React, {Component} from 'react';
import { Typography, Grid } from "@material-ui/core";
import UserTable from './UserTable';

class User extends Component{
    render(){
        return(
            <Grid item md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="headline">Users</Typography>
                <UserTable />
            </Grid>
        )
    }
}

export default User;