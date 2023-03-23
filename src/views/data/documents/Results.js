/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardHeader,
  CardContent,
  Grid,
  Card,
  Divider,
  makeStyles
} from '@material-ui/core';
import VideoCard from './videoCard';


const useStyles = makeStyles((theme) => ({
  root: {},
  content : {
    padding : "25px"
  },
  card : {
    marginRight : "25px"
  }
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > <CardHeader title="Documents list"/>
      <Divider />
      <CardContent className={classes.content}>
          <Grid container>
          {customers.map((customer) => {
            return(
              <Grid item key={customer.id} md={2} xs = {6}>
              <VideoCard className={classes.card} key={customer.id} video = {customer} />
              </Grid>
              )
            })}
        </Grid>
      </CardContent>
     {/*       
      <Modal open={open}  className={classes.paper}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        ><Fade in={open}>
              <Card className={classes.modal} style={{backgroundImage : `url(${photo})`, backgroundRepeat : "none", backgroundSize : "cover"}}>
                <Box style={{textAlign : "right"}}>               
                <Button style={{backgroundColor : "green"}} onClick={() => setOpen(false)}>Close</Button>
                </Box> 
          </Card>
        </Fade>
        </Modal> */}
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};
export default Results;
