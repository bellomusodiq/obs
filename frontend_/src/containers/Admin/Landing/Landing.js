import React, {Component, Fragment} from 'react';
import { Typography, Grid } from "@material-ui/core";
import Button from '../../../components/Button';
import { connect } from "react-redux";
import axios from 'axios';

class Landing extends Component{
    state = {
        user: null,
        error: false,
    }
    componentDidMount = () => {
      axios.get('http://localhost:8000/api/users/'+this.props.auth.id+'/')
      .then(({data}) => {
          this.setState({user: data})
      })
      .catch(() => this.setState({error: true}))
    }
    
    editProfileHandler = () =>{
        this.props.history.push('/edit-profile')
    }
    render(){
        let user = <Typography>Loading...</Typography>
        if(this.state.user){
            const {username, firstname, lastname, email} = this.state.user
            user = (
                <Fragment>
                <Grid container>
                    <Grid item sm={3}>
                        <Typography variant="body2">Username</Typography>
                    </Grid>
                    <Grid item sm={9}>
                        <Typography variant="body2">{username}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={3}>
                        <Typography variant="body2">Name</Typography>
                    </Grid>
                    <Grid item sm={9}>
                        <Typography variant="body2">{firstname+' '+lastname}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={3}>
                        <Typography variant="body2">Email</Typography>
                    </Grid>
                    <Grid item sm={9}>
                        <Typography variant="body2">{email}</Typography>
                    </Grid>
                </Grid>
                </Fragment>
            )
        }
        if(this.state.error){
            user = <Typography>An Error Occured</Typography>
        }
        return(
            <Grid item sm={12} md={10} style={{paddingLeft: 10, boxSizing: 'border-box'}}>
                <Typography variant="display1" color="inherit">Welcome {this.state.user?this.state.user.username:null}</Typography>
                <Grid style={{marginTop: 20}}>
                    {user}
                    <Grid>
                        <Button btnColor='yellow' onClick={this.editProfileHandler} >edit profile</Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Landing);