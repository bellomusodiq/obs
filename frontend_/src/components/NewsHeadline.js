import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import Card from './Card';
import { Grid, Typography } from '@material-ui/core';

const news = props => {
    return (
        <Fragment>
        <Grid className="news">
            <Card style={{padding: '10px 5px', marginBotton: 20}} >
                <div className="news-img-text">
                    <img src={props.image} alt={props.title} />
                    <div>
                        <Typography style={{marginBottom: 5}} variant="title">
                            <Link to={'/post/'+props.id} style={{color: '#0277BD', textDecoration: 'none'}}>{props.title}</Link>
                        </Typography>
                        <Typography style={{color: '#757575'}} ><i className="far fa-clock"></i> {props.publishedDate}
                            <span style={{marginLeft: 5}}><i className="fas fa-user"></i> {props.fullname} </span>
                            <span style={{marginLeft: 5}}><i className="far fa-comment"></i>{props.commentLength}</span>
                        </Typography>
                        <Typography style={{marginBottom: 5}}>
                            {props.content.length>120?props.content.slice(0, 120)+'[...]':props.content}
                        </Typography>
                    </div>
                </div>
            </Card>
        </Grid>
    </Fragment>
    )
}

export default news;