/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid
} from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

function Results({ className, recorded, Back, ...rest }) {

  return (
    <>
      <Grid container style={{minHeight:"450px", justifyContent : "center"}}>
        <Grid style = {{marginTop : "15%"}} item xs={12} md={6}>
        <AudioPlayer
            elevation={1}
            width="100%"
            variation="default"
            spacing={3}
            download={true}
            autoplay={true}
            order="standart"
            preload="auto"
            src={recorded}
          />
        </Grid>
        </Grid>
        <Box style={{textAlign : "right"}}>
            <Button
              color="secondary"
              variant="contained"
              onClick={Back}
              style={{margin : "30px"}}
            >
              Back
            </Button>
      </Box>
      </>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  recorded: PropTypes.string
};

export default Results;
