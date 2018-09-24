import React, {Component} from 'react';
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from 'axios';

class NewsSideNav extends Component{
    state = {
        post: null,
        error: false,
    }
    fetchPosts = () => {
        axios.get('http://localhost:8000/api/posts/?published=true')
        .then(({data}) => {
            this.setState({posts: data})
        })
        .catch(() => {
            this.setState({error: true})
        })
    }
    componentDidMount = () => {
        this.fetchPosts()
    }  
    render(){
        let newsHeadline = 'Loading...';
        if(this.state.posts){
            newsHeadline = this.state.posts.results.map(post => {
                return (
                    <Link key={post.id} to={'/post/'+post.slug} className='side-link' >{post.title}</Link>
                )
            })
        }
        if(this.state.error){
            newsHeadline = 'An error occured'
        }
        return(
            <Grid item xs={12} md={4} style={{boxSizing: 'border-box'}} >
                <Grid >
                    <Typography style={{padding: 10, background: '#0277BD', color: 'white'}} variant="body1">RECENT POST</Typography>
                    <Typography variant="subheading" style={{margin: '15px 0'}} >
                        {newsHeadline} 
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default NewsSideNav;