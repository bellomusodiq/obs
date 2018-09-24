import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 'home',
    categories: null,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    if(value === 'admin-dashboard'){
      this.props.history.push('/'+value)
    }else if(value === 'home'){
      this.props.history.push('/')
    }
    else{
      this.props.history.push('/search/?category='+value)
    }
  };
  componentDidMount = () => {
    axios.get('http://localhost:8000/api/category/')
    .then(({data}) => {
      this.setState({categories: data})
    })
  }
  
  render() {
    const { classes } = this.props;
    const { value, categories } = this.state;
    let tabs = null;
    if(categories){
      tabs = categories.results.map(category => {
        return <Tab key={category.id} value={category.title} label={category.title} />
      })
    }
    let adminDashboard = null;
    if(this.props.auth){
      if(this.props.auth.isAdmin){
        adminDashboard = <Tab value='admin-dashboard' label="Admin Dashboard" />
      }
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {adminDashboard}
            <Tab value='home' label="Home" />
            {tabs}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>{
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ScrollableTabsButtonForce)));