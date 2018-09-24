import React, {Component, Fragment} from 'react';
import { Typography, Grid, TextField } from "@material-ui/core";
import Button from '../../../components/Button';

class UserSettings extends Component{
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
        changePassword: false
    }
    render(){
    let errors = null;
    let form = (
        <Fragment>
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
            <TextField
                label="Old Password"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                required
                value = {this.state.password}
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
            <Grid item md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="headline">User Settings</Typography>
                <form onClick={this.submitChanges}>
                <Grid container justify="center" >
                    <Grid item xs={12} md={7}>
                        {form}
                            <Button type="submit" btnColor='blue'> SAVE CHANGES</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        )
    }
}

export default UserSettings;