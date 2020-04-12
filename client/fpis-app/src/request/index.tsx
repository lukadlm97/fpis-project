import React from 'react'
import { RequestForCooperation as RequestForCooperationItem} from '../model/RequestForCooperation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TitleIcon from '@material-ui/icons/Title';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from '../universal_components/loading'
import Box from '@material-ui/core/Box'

interface Props{
    requests:RequestForCooperationItem[]
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


function Request(props:Props) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    return(
        <>
            <h1>Stranica za zahteve za saradnju</h1>
           
           {props.requests.map((request)=>(
               <Box p={0.5} m={0.5}>

                   <Card className={classes.root} style={{border:'3px solid grey'}} key={request.id}>
                       <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                               <Box mr={1} pr={2}>
                                   <CalendarTodayIcon 
                                   style={{fontSize:15,color:"#727bb8"}}
                                   />
                                     {" "}
                                   {request.date}
                               </Box>
                           </Typography>
                           <Typography variant="h5" component="h2">
                               <Box  mr={10} pr={2}>
                                   <TitleIcon 
                                   style={{fontSize:20,color:"#727bb8"}}
                                   />
                                   {" "}
                               {request.title}
                               </Box>
                           </Typography>
                           <Typography className={classes.pos} color="textSecondary">
                               <Box  mr={10} pr={2}>
                                   <BusinessCenterIcon 
                                   style={{fontSize:15,color:"#727bb8"}}
                                   />
                                     {" "}
                               {request.company.name}
                               </Box>
                           </Typography>
                           <Typography variant="body2" component="p">
                               {request.descriptionOfProposal}
                           </Typography>
                       </CardContent>
                           <CardActions>
                               <Button size="small">Detaljnije</Button>
                           </CardActions>
               </Card>
            </Box>
            ))}
        </>
    );
}

export default Request