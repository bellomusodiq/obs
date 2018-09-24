import React, {Component} from 'react';
import { Grid, Typography } from "@material-ui/core";
import Image from '../../../assets/images/fifa.jpg';
import Card from "../../../components/Card";
class Comment extends Component{
    render(){
        return(
            <Grid item md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="headline">Recent Comments</Typography>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Grid>
        )
    }
}

export default Comment;