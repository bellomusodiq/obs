import React, {Component} from 'react';
import { Typography } from '@material-ui/core';


class NotFound extends Component{
    render(){
        return (
            <div style={{padding: '20px'}}>
                <Typography variant="display2">PAGE NOT FOUND</Typography>
            </div>
        )
    }
}

export default NotFound;