/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Backdrop,
  Card,
  CardMedia,
  Divider,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {},
  modalMedia : {
    // height: 200,
    // width: 300,
    margin: theme.spacing(1),
    marginRight : theme.spacing(4)
  },
  media: {
    height: 150,
    width: 200,
    margin: theme.spacing(1),
    marginRight : theme.spacing(4)
  },
  modal:{
    position: 'absolute',
    maxWidth: 1200,
    top : 50,
    width : "80%",
    height : "80%",
    padding: theme.spacing(2, 4, 3),
    
  },
  paper:{
    display: 'flex',
    justifyContent: 'center',
    overflow: "scroll"
  },
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(customers[0].photoURL[0]);

  const openModal = (messageContent) => {
    setPhoto(messageContent);
    setOpen(true);
  };
  console.log(photo)

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                   Images
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {

                return (
                  <TableRow
                    key={customer.id}
                  >
                    <TableCell>
                      {customer.updatedAt}
                    </TableCell>
                    <TableCell>
                    <Box display="flex">
                      {customer.photoURL.map((eachPhoto) => {
                          return(                       
                            <CardMedia
                             key={eachPhoto}
                              className={classes.media}
                              image={eachPhoto}
                              onClick = {() => openModal(eachPhoto) }
                             />                      
                          )
                      })}
                     </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      
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
        </Modal>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};
export default Results;
