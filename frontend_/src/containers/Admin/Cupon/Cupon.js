import React, {Component} from 'react';
import { Typography, Grid } from "@material-ui/core";

class Cupon extends Component{
    render(){
        return(
            <Grid item md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="headline">Cupon code management</Typography>
                <Grid container >
                    <Grid item xs={8}>
                        <Typography variant='subheading'>Cupon code</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subheading">Action</Typography>
                    </Grid>
                </Grid><hr/>
                <Grid container >
                    <Grid item xs={8}>
                        <Typography >Xdf12FkGiU</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Delete</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Cupon;