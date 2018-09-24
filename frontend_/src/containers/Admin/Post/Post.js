import React, {Component, Fragment} from 'react';
import { Typography, Grid, TextField } from "@material-ui/core";
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import './Post.css';
import { Link } from "react-router-dom";
import PostTable from './PostTable';
import axios from 'axios';
import {connect} from 'react-redux';
import SnackBar from '../../../components/SnackBar';
import Modal from '../../../components/Modal';

class Post extends Component{
    state = {
        showAdd: false,
        postTitle: '',
        postDescription: '',
        editing: false,
        music: false,
        publish: true,
        musicTitle: '',
        posts: null,
        error: false,
        openSnackbar: false,
        openModal: false,
        postSlug: null,
    }
    fetchPost = () => {
        axios.get('http://localhost:8000/api/posts/')
        .then(({data}) => {
            this.setState({posts: data})
        })
        .catch(() => {
            this.setState({error: true})
        })
    }
    componentDidMount = () => {
      this.fetchPost();
    }
    
    musicToggle = () => {
        if(this.state.music){
            this.setState({music: false})
        }else{
            this.setState({music: true})
        }
    }
    postPublishToggle = () => {
        if(this.state.publish){
            this.setState({music: false})
        }else{
            this.setState({music: true})
        }
    }
    postDeleteHandler = () => {
        const headers = {
            Authorization: 'JWT '+ this.props.auth.token
        }
        axios.delete('http://localhost:8000/api/posts/'+this.state.postSlug+'/', {headers: headers})
        .then(() => {
            this.setState({openSnackbar: true, error: false, message: 'Post deleted succesfully'})
            this.fetchPost()
        })
        .catch(() => this.setState({openSnackbar: true, error: true}))
    }
    editPost = slug => {
        axios.get('http://localhost:8000/api/posts/'+slug+'/')
        .then(({data}) => {
            this.setState({postTitle: data.title, postSlug: data.slug, postDescription: data.content,editing: true, showAdd: true })
        })
    }
    submitPost = () => {
        if(this.state.editing){
            const headers = {
                Authorization: 'JWT '+this.props.auth.token
            }
            axios.patch('http://localhost:8000/api/posts/'+this.state.postSlug+'/', {headers: headers})
            .then(() => {
                this.setState({openSnackbar: true, error: false, message: 'post update successfull'})
                this.fetchPost();
            })
            .catch(() => {
                this.setState({openSnackbar: true, error: true, message: 'post update unsuccessful'})
            })
        }else{
            const headers = {
                Authorization: 'JWT '+this.props.auth.token
            }
            axios.post('http://localhost:8000/api/posts/', {headers: headers})
            .then(() => {
                this.setState({openSnackbar: true, error: false, message: 'post create successfull'})
                this.fetchPost();
            })
            .catch(() => {
                this.setState({openSnackbar: true, error: true, message: 'post create unsuccessfull'})
            })
        }
    }
    render(){
        return(
            <Grid item sm={12} md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Modal open={this.state.openModal}
                    handleClose={() => this.setState({openModal: false})}
                    submit={this.postDeleteHandler}
                    submitTitle='confirm'
                    >
                        <span>Are you sure you want to delete this post?</span>
                </Modal>
                <SnackBar close={() => this.setState({openSnackbar: false})}
                 open={this.state.openSnackbar}>{
                    this.state.error?<span style={{color: '#F44336'}}>Some thing went wrong, Try again</span>
                    :<span style={{color: '#2E7D32'}}>{this.state.message}</span>
                }</SnackBar>
                <Typography variant="display2" color="inherit">Post Management</Typography>
                <Grid container justify="flex-end">
                    <Button btnColor="blue" onClick={() => this.setState({showAdd: true})}>ADD NEW</Button>
                </Grid>
                <div className={!this.state.showAdd?"add-new":"add-new showreg"}>
                <form onSubmit={this.submitPost}>
                <Grid container justify="center" >
                    <Grid item xs={12} md={7}>
                        <TextField
                            id="full-width"
                            label="Category Name"
                            InputLabel={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            value = {this.state.postTitle}
                            onChange={(e) => this.setState({postTitle: e.target.value})}
                            margin="normal"
                            />
                        <TextField
                            id="full-width"
                            label="Description"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            value = {this.state.postDescription}
                            onChange={(e) => this.setState({postDescription: e.target.value})}
                            margin="normal"
                            multiline
                            />
                            <Typography style={{marginTop: 20}}>Image</Typography>
                            <input style={{margin: '20px 0'}} required={!this.state.editing} ref={inp =>{this.imageInput = inp;}} accept='image/*'
                                type="file" /><br/>
                            <Checkbox on={this.state.music}
                                label='Music'
                             onChange={(e) => this.musicToggle(e)} />
                            {this.state.music?
                                <Fragment>
                                    <Typography style={{marginTop: 20}}>Music</Typography>
                                    <input style={{margin: '20px 0'}} required={!this.state.editing} ref={inp =>{this.musicInput = inp;}} accept='mp3/*'
                                        type="file" /><br/><br/>
                                    <TextField
                                        id="full-width"
                                        label="Music Title"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        required
                                        value = {this.state.musicTitle}
                                        onChange={(e) => this.setState({musicTitle: e.target.value})}
                                        margin="normal"
                                        />
                                </Fragment>
                            :null}
                            <Checkbox on={this.state.publish}
                                label='Publish Post'
                             onChange={(e) => this.postPublishToggle(e)} />
                            <Button type="submit" btnColor='blue'> SAVE </Button>
                    </Grid>
                </Grid>
                </form>
                </div>
                <PostTable 
                posts={this.state.posts} 
                edit={(slug) => this.editPost(slug)}
                openModal={(slug) => this.setState({openModal: true, postSlug: slug})} />
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Post);