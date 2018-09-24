import React, {Component} from 'react';
import { Typography, Grid, TextField } from "@material-ui/core";
import Papper from '../../components/Card';
import Button from '../../components/Button';

class ResetPassword extends Component{
    state = {
        password1: '',
        password2: '',
    }
    render(){
        return (
            <Grid container justify='center'>
                <Grid sx={12} sm={8} lg={4}>
                        <Papper>
                            <div style={{paddingTop: 60, paddingBottom: 60, paddingLeft: 20, paddingRight: 20}}>
                            <Typography style={{marginBottom: 40, textAlign: 'center'}} variant='title'>Reset Password</Typography>
                                <form onSubmit={this.handleLogin}>
                                <TextField
                                label="Enter new password"
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
                                label="Confirm new password"
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
                                    <Button disable={this.state.loading} btnColor="blue" type="submit">reset</Button>
                                </form>
                            </div>
                        </Papper>
                    </Grid>
            </Grid>
        )
    }
}

export default ResetPassword;