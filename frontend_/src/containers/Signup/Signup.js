import React, {Component, Fragment} from 'react';
import Papper from '../../components/Card';
import { Grid, Typography, TextField } from '@material-ui/core';
import Button from '../../components/Button';
import SnackBar from '../../components/SnackBar';
import axios from 'axios';

class SignUp extends Component{
    state = {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password1: '',
        password2: '',
        message: null,
        error: false,
        errorMessages: {
            email: [],
            password: [],
            username: []
        },
        is_admin: false,
        openSnackbar: false,
    }
    signup = e =>{
        e.preventDefault();
        if(this.state.password1 === this.state.password2){
            const datA = {
                username: this.state.username,
                email: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: this.state.password1,
                is_admin: this.state.is_admin
            }
            
            axios.post('http://localhost:8000/api/users/', datA)
            .then(({data}) => {
                this.setState({message: 'a verification mail has been sent to your email', openSnackbar: true, error: false})
            })
            .catch(({response}) => {
                let messages = this.state.errorMessages;
                const data = response.data;
                for(let obj in data){
                    messages[obj] = data[obj]
                }
                this.setState({error: true, openSnackbar: true, message: 'sign up was unsuccessful..', errorMessages: messages})
            })
        }else{
            this.setState({error: true, message: 'your password does not match'})
        }
    }
    render(){
        return(
            <Fragment>
                <SnackBar close={() => this.setState({openSnackbar: false})}
                 open={this.state.openSnackbar}>{
                    this.state.error?<span style={{color: '#F44336'}}>Some thing went wrong, Try again</span>
                    :<span style={{color: '#2E7D32'}}>{this.state.message}</span>
                }</SnackBar>
                <Grid container justify="center">
                    <Grid lg={4}>
                        <Papper>
                            <div style={{paddingTop: 60, paddingBottom: 60, margin: '0 10px', boxSizing: 'border-box'}}>

                                <Typography variant="headline" style={{textAlign: 'center'}}>SignUp</Typography>
                                <form onSubmit={this.signup}>
                                <Typography style={{color:this.state.error?'red':'green'}}>
                                    {this.state.message}
                                </Typography>
                                {this.state.errorMessages?
                                    this.state.errorMessages.username.map((message, i) => {
                                        return <span key={i} style={{color: '#F44336'}}>{message}</span>
                                    })    
                                :null}
                                <TextField
                                    id="full-width"
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
                                {this.state.errorMessages?
                                    this.state.errorMessages.email.map((message, i) => {
                                        return <span key={i} style={{color: '#F44336'}}>{message}</span>
                                    })    
                                :null}
                                <TextField
                                    id="full-width"
                                    label="Email Address"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                    value = {this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
                                    margin="normal"
                                    type='email'
                                    />
                                <TextField
                                    id="full-width"
                                    label="First Name"
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
                                    id="full-width"
                                    label="Last Name"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                    value = {this.state.lastname}
                                    onChange={(e) => this.setState({lastname: e.target.value})}
                                    margin="normal"
                                    />
                                {this.state.errorMessages?
                                    this.state.errorMessages.password.map((message, i) => {
                                        return <span key={i} style={{color: '#F44336'}}>{message}</span>
                                    })    
                                :null}
                                <TextField
                                    id="full-width"
                                    label="Password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                    value = {this.state.password1}
                                    onChange={(e) => this.setState({password1: e.target.value})}
                                    margin="normal"
                                    type="password"
                                    />
                                <TextField
                                    id="full-width"
                                    label="Confirm Password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                    value = {this.state.password2}
                                    onChange={(e) => this.setState({password2: e.target.value})}
                                    margin="normal"
                                    type="password"
                                    />
                                <Button type="submit" btnColor="blue">SignUp</Button>
                            </form>
                            </div>
                        </Papper>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default SignUp;