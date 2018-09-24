import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Info from "../../components/Info";
import axios from 'axios';
import { connect } from "react-redux";


class PostDetail extends Component{
    state = {
        currentPost: null,
        error: false,
        errorStatus: null,
        commentError: false,
        content: '',
    }
    fetchSinglePost = () =>{
        const id = this.props.history.location.pathname.split('/')[2];
        axios.get('http://localhost:8000/api/posts/'+id+'/?published=true')
        .then(result => {
            this.setState({currentPost: result.data})
            const headers = {
                Authorization: 'JWT '+this.props.auth.token
            }
            axios.get('http://localhost:8000/api/account/read/?post='+result.data.id, {headers: headers})
        })
        .catch(err => {
            this.setState({error: true, errorStatus: err.response.status});
        })
    }
    componentDidMount = () => {
      this.fetchSinglePost()
    }
    addComment = (e) => {
        e.preventDefault();
        const {auth} = this.props
        const data = {
            author: auth.id,
            content: this.state.content,
            post: this.state.currentPost.id 
        }
        axios.post('http://localhost:8000/api/comments/', data)
        .then((result) => {
            this.setState({commentError: false, content: ''})
            this.fetchSinglePost();
            const headers = {
                Authorization: 'JWT '+this.props.auth.token
            }
            axios.get('http://localhost:8000/api/account/comment/?post='+this.state.currentPost.id, {headers: headers})
        })
        .catch(() => this.setState({commentError: true}))
    }
    render(){
        let post = <div>Loading...</div>
        const {currentPost, error, errorStatus} = this.state;
        if(currentPost){
            let comments = <Typography variant='subheading'>No comments yet!</Typography>
            if(currentPost.comments.length > 0){
                comments = currentPost.comments.map(comment =>{
                    return <Comment key={comment.id} username={comment.username} content={comment.content} />
                })
            }
            post = (
                <Fragment>
                    <Typography variant="display1" color='inherit' style={{marginBottom: 20}} >{currentPost.title}</Typography>
                            <img alt={currentPost.title} src={currentPost.image} style={{maxWidth: '95%'}} />
                            <Typography style={{margin: '20px 0'}} >
                                {currentPost.content}
                            </Typography>
                            {currentPost.music?
                            <Fragment>
                            <Typography variant="title" style={{color: '#2196F3'}} >{currentPost.music_title}</Typography>
                            <audio src={currentPost.music} controls ></audio>
                            </Fragment>: null}
                            <Typography style={{marginTop: 20}} variant="display11 color='inherit'" color="inherit">COMMENTS</Typography>
                            {comments}
                            <CommentForm addComment={(e) => this.addComment(e)}
                             changeComment={value => this.setState({content: value})}
                             content={this.state.content} />
                </Fragment>
            )
        }if(errorStatus){
            post = <Typography variant='headline'>Post Not Found</Typography>
        }
        return(
            
            <Fragment>
                    <Grid container style={{margin: '10px 0'}} justify='center'>
                        <Grid item sx={12} md={9}>
                            <Info />
                            <Grid container >
                                <Grid item xs={12} md={8} >
                                    {post}
                        </Grid>
                        <Grid item xs={12} md={4} style={{boxSizing: 'border-box'}} >
                            <Grid >
                                <Typography style={{padding: 10, background: '#0277BD', color: 'white'}} variant="body1">RECENT POST</Typography>
                                <Typography variant="subheading" style={{margin: '15px 0'}} >
                                    <Link to='/post/my' className='side-link' >New post here</Link> 
                                </Typography>
                            </Grid>
                        </Grid> 
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PostDetail);
