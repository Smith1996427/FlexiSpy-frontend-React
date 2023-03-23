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

import {BsVolumeUp} from 'react-icons/bs'

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
        <BsVolumeUp size={60}/>
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
          {video.duration}
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
      ><a href={video.audioURL}>
       <Button fullWidth style={{backgroundColor : "#333f72"}}>
        Download
       </Button>
       </a>
      </Box>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string
};

export default ProjectCard;
