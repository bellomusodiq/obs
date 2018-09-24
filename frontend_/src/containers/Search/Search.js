import React, {PureComponent, Fragment} from 'react';
import { Grid, Typography } from '@material-ui/core';
import NewsHeadline from '../../components/NewsHeadline';
import NewsSideNav from '../NewsSideNav/NewsSideNav';
import Info from '../../components/Info';
import axios from 'axios';

class Home extends PureComponent{
    state = {
        error: false,
        posts: null,
        search: null,
    }
    fetchPosts = () => {
        const value = this.props.history.location.search.split('?')[1]
        axios.get('http://localhost:8000/api/posts/?published=true&'+ value)
        .then(({data}) => {
            this.setState({posts: data, search: value})
        })
        .catch(() => {
            this.setState({error: true})
        })
    }
    componentDidMount = () => {
        this.fetchPosts()
    }    
    componentDidUpdate = () => {
        const value = this.props.history.location.search.split('?')[1]
        if(this.state.search !== value){
            this.fetchPosts()
        }
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
            if(this.state.posts.results.length === 0){
                newsHeadline = <Typography variant='subheading'>Search Not Found!!</Typography>
            }
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