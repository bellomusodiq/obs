import React, {Component} from 'react';
import { Grid, Typography, withWidth } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

class SideNav extends Component{
    state = {
        current: 'home',
    }
    componentDidUpdate = () => {
      const current = this.props.history.location.pathname.split('/')[2]
      if(current !== this.state.current){
          this.setState({current: current})
      }
    }
    checkCurrent = (id, type) => {
        if(type==='background'){
            if(id === this.state.current){
                return '#212121'
            }
        }else{
            if(id === this.state.current){
                return 'white'
            }
        }
    }
    render(){
        const {width} = this.props;
        let styles = {
            height: 'calc(100vh - 125px)',
        }
        if(width === 'sm' || width === 'xs'){
            styles = {
                height: '100vh',
                background: 'green',
                position: 'fixed',
                top: 0,
                right: 0,
                width:'70vw' ,
                display: 'none'
            }
        }
        return (
            <Grid item md={2} style={styles} >
                <Link to='/admin-dashboard' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('home', 'background'),padding:'10px 10px',}}>Home</Typography>
                </Link>
                <Link to='/admin-dashboard/posts' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('posts', 'background'),padding:'10px 10px',}}>Posts</Typography>
                </Link>
                <Link to='/admin-dashboard/comments' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('comments', 'background'),padding:'10px 10px',}}>Comments</Typography>
                </Link>
                <Link to='/admin-dashboard/site-settings' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('site-settings', 'background'),padding:'10px 10px',}}>Site Settings</Typography>
                </Link>
                <Link to='/admin-dashboard/users' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('users', 'background'),padding:'10px 10px',}}>Users</Typography>
                </Link>
                <Link to='/admin-dashboard/cuponcodes' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('cuponcodes', 'background'),padding:'10px 10px',}}>Cupon Codes</Typography>
                </Link>
                <Link to='/admin-dashboard/witdrawal' style={{textDecoration: 'none', color: this.checkCurrent('home', 'color') }}>
                    <Typography variant='button' style={{margin: '5px 0', background:this.checkCurrent('witdrawal', 'background'),padding:'10px 10px',}}>Witdrawal</Typography>
                </Link>
            </Grid>
        )
    }
}

export default withRouter(withWidth()(SideNav));