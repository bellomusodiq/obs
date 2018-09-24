import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Button.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

function CustomizedInputs(props) {
  const { classes } = props;
  let buttonColor = {
      color: '#252525',
      background: 'white'
  }
  if(props.btnColor === 'red'){
    buttonColor = {
        background: '#F44336',
        color: 'white'
    }
  }
  if(props.btnColor === 'blue'){
    buttonColor = {
        background: '#2196F3',
        color: 'white'
    }
  }
  if(props.btnColor === 'green'){
    buttonColor = {
        background: '#4CAF50',
        color: 'white'
    }
  }
  if(props.btnColor === 'black'){
    buttonColor = {
        background: '#252525',
        color: 'white'
    }
  }
  if(props.btnColor === 'orange'){
    buttonColor = {
        background: '#EF6C00',
        color: 'white'
    }
  }
  if(props.btnColor === 'yellow'){
    buttonColor = {
        background: '#FF8F00',
        color: '#252525'
    }
  }
  return (
    <div className={classes.container}>
      <Button
        disabled={props.disable}
        type={props.type}
        variant="contained"
        color="inherit"
        className={classNames(classes.margin, classes.cssRoot)}
        style={buttonColor}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </div>
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);