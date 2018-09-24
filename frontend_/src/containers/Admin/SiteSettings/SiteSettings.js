import React, {Component} from 'react';
import { Typography, Grid } from "@material-ui/core";

class Settings extends Component{
    render(){
        return(
            <Grid item md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                Admin Settings
            </Grid>
        )
    }
}

export default Settings;