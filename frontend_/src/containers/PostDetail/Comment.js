import React, { Component, Fragment } from 'react';
import Card from "../../components/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '../../components/Button';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Comment extends Component {
  render() {
    return (
      <Fragment>
        <Card>
            <CardContent>
                <Typography
                variant='subheading' style={{color: '#2196F3'}}
                >{this.props.username}</Typography>
                <Typography>
                    {this.props.content}
                </Typography>
                </CardContent>
    </Card>
      </Fragment>
    )
  }
}
