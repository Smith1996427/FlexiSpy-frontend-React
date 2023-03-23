import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Button,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop : 30
  },
}));

function ProjectCard({ video, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box style={{textAlign : "center"}}>
        <ReceiptIcon  style={{fontSize : "60px"}}/>
      </Box>
      <Box
        pb={2}
        px={3}
        style={{textAlign : "center"}}
      >
        <Typography
          color="textSecondary"
          variant="h6"
        >
          {video.docName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h6"
        >
          {video.updatedAt}
        </Typography>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={2}
        style={{textAlign : "center"}}
      ><a href={video.docURL}>
       <Button fullWidth style={{backgroundColor : "#333f72"}}>
        Download
       </Button>
       </a>
      </Box>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
