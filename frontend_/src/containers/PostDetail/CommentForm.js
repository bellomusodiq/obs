import React, {Component} from 'react';
import {TextField, Typography} from '@material-ui/core';
import Button from '../../components/Button';
import { connect } from "react-redux";

class CommentForm extends Component{
    render(){
        return (
            <div style={{marginTop: 20}}>
                <Typography style={{padding: 10, background: '#0277BD', color: 'white'}} variant="body1">ADD COMMENT</Typography>
                <form onSubmit={(e) => this.props.addComment(e)}>
                <TextField
                    id="full-width"
                    label="Comment"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    value = {this.props.content}
                    onChange={(e) => this.props.changeComment(e.target.value)}
                    margin="normal"
                    multiline
                    />
                    <Button type="submit" btnColor='blue'> SAVE </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CommentForm);
