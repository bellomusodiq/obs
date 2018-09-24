import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import Image from '../../../assets/images/fifa.jpg';
import Card from "../../../components/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
import Button from '../../../components/Button';


class PostDetail extends Component{
    render(){
        return(
            <Grid item sm={12} md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="display2" style={{marginBottom: 20}} >This is the post title here</Typography>
                <img alt='' src={Image} style={{maxWidth: '95%'}} />
                <Typography style={{margin: '20px 0'}} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis sit nisi dolor ratione, numquam nulla odit quisquam totam a reprehenderit asperiores molestiae doloribus rem enim vitae. Numquam, sint reiciendis.
                </Typography>
                <Typography variant="title" style={{color: '#2196F3'}} >Ed Sheeran - Perfect</Typography>
                <audio src="" controls ></audio>
                <Typography style={{marginTop: 20}} variant="display1" color="inherit">COMMENTS</Typography>
                <Card>
                <CardContent>
                    <Typography
                    variant='subheading'><Link style={{color: '#2196F3', cursor: 'pointer', textDecoration: 'none'}}
                    to='/admin-dashboard/user/1'>bello123</Link></Typography>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quidem deserunt consequuntur quam aliquid dicta error ipsa quia quibusdam molestiae atque, aut quis placeat in nostrum voluptatem exercitationem voluptatum est!

                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button btnColor='red'>Delete</Button>
                </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default PostDetail;