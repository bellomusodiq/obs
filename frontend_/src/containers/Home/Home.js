import React, {Component, Fragment} from 'react';
import { Grid } from '@material-ui/core';
import './Home.css';
import NewsHeadline from '../../components/NewsHeadline';
import NewsSideNav from '../NewsSideNav/NewsSideNav';
import Info from '../../components/Info';
import axios from 'axios';

class Home extends Component{
    state = {
        error: false,
        posts: null,
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
                <NewsHeadline key={post.id}
                    id={post.slug}
                    title={post.title} commentLength={post.comments.length}
                    publishedDate={post.published_at} 
                    image={post.image}
                    fullname={post.author_detail.firstname + ' ' + post.author_detail.lastname}
                    content={post.content}
                 />
                )
            })
        }
        return(
            <Fragment>
                <Info />
                <Grid container justify="center" >
                <Grid item sx={12} md={9}>
                    <Grid container >
                        <Grid item xs={12} md={8}>
                            {newsHeadline}
                        </Grid>
                        <NewsSideNav />
                    </Grid>
                </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default Home;