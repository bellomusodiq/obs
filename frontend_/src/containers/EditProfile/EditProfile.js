import React, { Component, Fragment } from 'react';
import { Grid, Typography, TextField } from "@material-ui/core";
import Papper from '../../components/Card';
import Button from '../../components/Button';
import { connect } from "react-redux";
import axios from 'axios';
import SnackBar from '../../components/SnackBar';

class EditProfile extends Component{
    state = {
        username: '',
        password: '',
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        firstname: '',
        lastname: '',
        email: '',
        loading: false,
        changePassword: false,
        errorMessage: null,
        openSnackbar: false,
        submitError: false
    }
    fetchUserProfile = () =>{
        const {auth} = this.props;
        axios.get('http://localhost:8000/api/users/'+auth.id+'/')
        .then(result => {
            const { username, firstname, lastname, email} = result.data;
            this.setState({username: username, firstname: firstname, lastname: lastname, email: email})
        })
        .catch(err => {
            this.setState({error: true});
        })
    }
    componentDidMount = () => {
        this.fetchUserProfile()
    }
    editProfile = e => {
        e.preventDefault();
        if(this.state.changePassword){
            const data = {
                old_password: this.state.oldPassword,
                new_password1: this.state.newPassword1,
                new_password2: this.state.newPassword2,
            }
            const headers = {
               'Authorization': 'JWT '+this.props.auth.token
            }
            axios.patch('http://localhost:8000/api/users/'+this.props.auth.id+'/?change_password=true', data, {headers: headers})
            .then(result => {
                this.setState({errorMessage: null, submitError: false, openSnackbar: true, oldPassword: '', newPassword1: '', newPassword2: ''})
                this.fetchUserProfile();
            })
            .catch(err => {
                this.setState({error: true, errorMessage: err.response.data.data, submitError: true, openSnackbar: true});
            })
        }else{
            const { password, username, firstname, lastname, email} = this.state;
            const data = {
                username: username,
                email: email, 
                firstname: firstname,
                lastname: lastname,
                checkpassword: password,
            }
            const headers = {
               'Authorization': 'JWT '+this.props.auth.token
            }
            axios.patch('http://localhost:8000/api/users/'+this.props.auth.id+'/', data, {headers: headers})
            .then(result => {
                this.setState({errorMessage: null, submitError: false, openSnackbar: true})
                this.fetchUserProfile()
            })
            .catch(err => {
                this.setState({error: true, errorMessage: err.response.data.data, submitError: true, openSnackbar: true});
            })
        }
    }
    render(){
        let error = null;
        if(this.state.errorMessage){
            error = <Typography style={{color: 'red'}}>{this.state.errorMessage}</Typography>
        }
        let form = (
            <Fragment>
                {error}
                <TextField
                    label="Username"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                    margin="normal"
                    />
                <TextField
                    label="First name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.firstname}
                    onChange={(e) => this.setState({firstname: e.target.value})}
                    margin="normal"
                    />
                <TextField
                    label="Last name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.lastname}
                    onChange={(e) => this.setState({lastname: e.target.value})}
                    margin="normal"
                    />
                <TextField
                    label="Email Address"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                    margin="normal"
                    type="email"
                    />
                <TextField
                    label="Password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                    margin="normal"
                    type="password"
                    />
            </Fragment>
        )
        if(this.state.changePassword){
            form = (
                <Fragment>
                {error}
                <TextField
                    label="Old Password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.oldPassword}
                    onChange={(e) => this.setState({oldPassword: e.target.value})}
                    margin="normal"
                    type="password"
                    />
                <TextField
                    label="New Password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.newPassword1}
                    onChange={(e) => this.setState({newPassword1: e.target.value})}
                    margin="normal"
                    type="password"
                    />
                <TextField
                    label="Confirm Password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.state.newPassword2}
                    onChange={(e) => this.setState({newPassword2: e.target.value})}
                    margin="normal"
                    type="password"
                    />
                </Fragment>
            )
        }
        return(
            <Fragment>
                <SnackBar close={() => this.setState({openSnackbar: false})}
                 open={this.state.openSnackbar}>{
                    this.state.submitError?<span style={{color: '#F44336'}}>Some thing went wrong, Try again</span>
                    :<span style={{color: '#2E7D32'}}>Update successfull</span>
                }</SnackBar>
               <Grid container alignItems="center" direction='column' >
                    <Grid container justify='center'>
                        <span onClick={() => this.setState({changePassword: false})}
                         style={{margin: '20px 5px', cursor: 'pointer', color: '#0091EA'}}>EDIT PROFILE</span>
                        <span onClick={() => this.setState({changePassword: true})}
                         style={{margin: '20px 5px', cursor: 'pointer', color: '#0091EA'}}>CHANGE PASSWORD</span>
                    </Grid>
                    <Grid sx={12} sm={8} lg={4}>
                        <Papper>
                            <div style={{paddingTop: 60, paddingBottom: 60, paddingLeft: 20, paddingRight: 20}}>
                            <Typography style={{marginBottom: 40, textAlign: 'center'}}
                            variant='title'>{this.state.changePassword?'Change Password':'Edit Profile'}</Typography>
                                <form onSubmit={this.editProfile}>
                                    {form}
                                    <Button disable={this.state.loading} btnColor="blue" type="submit">SAVE CHANGES</Button>
                                </form>
                            </div>
                        </Papper>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}


const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(EditProfile);