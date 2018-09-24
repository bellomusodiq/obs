import React, {Component, Fragment} from 'react';
import Papper from '../../components/Card';
import { Grid, Typography, TextField } from '@material-ui/core';
import Button from '../../components/Button';
import { connect } from "react-redux";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component{
    state = {
        username: '',
        password: '',
        errorMessage: null,
        loading: false,
        successMessage: null,
    }
    handleLogin = (event) =>{
        event.preventDefault();
        this.setState({loading: true})
        const data = {
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:8000/api/account/login/', data)
        .then(result => {
            this.setState({loading: false})
            this.props.saveAuthInfo(result.data);
        })
        .catch((err) => {
            let error = ''
            if(err.response){
                error = err.response.data.non_field_errors
            }
            this.setState({loading: false, 
                errorMessage: error
            })
        })
    }
    render(){
        let errors = null;
        if(this.state.errorMessage){
            errors = this.state.errorMessage.map((err, i) => {
                return <Typography style={{color: 'red'}} key={i}>{err}</Typography>
            })
        }
        return(
            <Fragment>
               {!this.props.auth? <Grid container justify="center">
                    <Grid lg={4}>
                        <Papper>
                            <div style={{paddingTop: 60, paddingBottom: 60}}>
                                <form onSubmit={this.handleLogin}>
                                    <Typography variant="headline" style={{textAlign: 'center'}}>Login</Typography>
                                        {errors}
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
                                    <Button disable={this.state.loading} btnColor="blue" type="submit">LOGIN</Button>
                                </form>
                            </div>
                        </Papper>
                    </Grid>
                </Grid>:<Redirect to='/' />}
            </Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        saveAuthInfo: (data) => dispatch({type: 'SAVE_AUTH_INFO', authData: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);