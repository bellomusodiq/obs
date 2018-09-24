import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from "@material-ui/core";
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar(props) {
  const { classes, width } = props;
  let heading = (
    <Typography variant="title" style={{textAlign: 'center', margin: '0 auto', color: '#fff'}} 
    color="inherit">
      ONH.com.ng
    </Typography>
  )
  if(width === 'sm' || width === 'xs'){
      heading = (
          <Grid container justify='space-between' >
            <Grid item sm={1} >
                <Typography variant="title"
                 style={{textAlign: 'center', color: '#fff'}} 
                color="inherit">
                <i className="fas fa-bars"></i>
                </Typography>
            </Grid>
            <Grid item sm={10} >
                <Typography variant="title" 
                style={{textAlign: 'center', margin: '0 auto', color: '#fff'}} 
                    color="inherit">
                ONH.com.ng
            </Typography>
            </Grid>
            <Grid item sm={1} >
            <Typography variant="title"
                 style={{textAlign: 'center', color: '#fff'}} 
                color="inherit">
                Admin
                </Typography>
            </Grid>
          </Grid>
      )
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#212121'}} color="default">
        <Toolbar>
            {heading}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(SimpleAppBar));