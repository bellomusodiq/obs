import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, posts } = props;
  let postList = <div>Loading...</div>
  if(posts){
    postList = posts.results.map((post, i) => {
      return (
        <TableRow key={i+1}>
          <TableCell>{i+1}</TableCell>
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.published_at?'published':'not published'}</TableCell>
          <TableCell>{post.published_at?post.published_at:'not published'}</TableCell>
          <TableCell>
            <span style={{margin: '0 10px', color: '#F44336'}}
              onClick={() => props.openModal(post.slug)}
             ><i className="fas fa-trash-alt"></i></span>
            <span style={{margin: '0 10px', color: '#FFC107'}}
              onClick={() => props.edit(post.slug)}
             >EDIT</span>
            <span style={{margin: '0 10px', color: '#2196F3'}} >{post.published_at?'UNPUBLISH':'PUBLISH'}</span>
          </TableCell>
        </TableRow>
      );
    })
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Publish Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postList}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);