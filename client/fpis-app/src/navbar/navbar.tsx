import React ,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Switch,Route,Redirect,Link} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import BusinessIcon from '@material-ui/icons/Business';
import DescriptionIcon from '@material-ui/icons/Description';


import Home from '../home'
import Company from '../company'
import Request from '../request'
import useStyles from '../style'
import HomeIcon from './homeicon'

const NavBar:React.FC = () =>{

    const [isOpen,setOpen] = useState(false)

    const classes = useStyles();

    return(
        <>
        <div className={classes.root}>
            <AppBar style={{background : '#727bb8'}} position="static" >
          
                <div>
                    <Button component={Link} to="/">
                        <HomeIcon color="action" 
                        style={{ fontSize: 40,color:"#161824" }}/> 
                        Home
                        </Button>
                    <Button component={Link} to="/company">
                        <BusinessIcon color="action"
                        style={{fontSize:40,color:"#161824"}}/>
                        Company
                    </Button>
                    <Button component={Link} to="/request">
                        <DescriptionIcon color="action"
                        style={{fontSize:40,color:"#161824"}}/>
                        Requests
                    </Button>
                </div>
            </AppBar>
            <div>
                <Container maxWidth="sm">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/company" component={Company} />
                        <Route exact path="/request" component={Request} />
                        <Redirect to="/"/>
                    </Switch>
                </Container>
            </div>
        </div>
        </>
    );
}

export default NavBar