import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './navbar/navbar'
import { Contact as ContactModel } from './model/Contact';
import {getAllContacts,getAllCompanies} from './service/api'
import { promises } from 'dns';
import Contact from './contact/index'
import {Company as CompanyModel } from './model/Company';
import Company from './company/index'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Switch,Route,Redirect,Link} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import BusinessIcon from '@material-ui/icons/Business';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateIcon from '@material-ui/icons/Create';
import Box from '@material-ui/core/Box'
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HomeIcon from './navbar/homeicon'
import useStyles from './navbar/style'
import Home from './home/index'
import Request from './request/index'


interface State{
  contacts:ContactModel[]
  companies:CompanyModel[]
}


function App() {

  let [contacts,setContacts] = useState<ContactModel[]>([])
  let [companies,setCompanies] = useState<CompanyModel[]>([])

  const getContacts = async()=>{
    try{
      setContacts(await getAllContacts())
    }catch(e){
      console.log(e)
    }
  }

  const getCompanies = async()=>{
    try{
      setCompanies(await getAllCompanies())
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    (async function(){
      await getContacts();
      await getCompanies();
    })();
  },[])

  const classes = useStyles();
  return (
   <>
    <Router>
    <div className={classes.root}>
            <AppBar style={{background : '#727bb8'}} position="static" >
                <div>
                    <Box justifyContent="left"
                        display="flex"
                        alignItems="center"
                        css={{ height: 60 }}
                        p={0.7}
                        m={0.7}
                        mx="auto"
                        >
                    <Button component={Link} to="/">
                        <HomeIcon color="action" 
                        style={{ fontSize: 40,color:"#161824" }}/> 
                        Pocetna
                        </Button>
                    <Button component={Link} to="/company">
                        <BusinessIcon color="action"
                        style={{fontSize:40,color:"#161824"}}/>
                        Kompanije
                    </Button>
                    <Button component={Link} to="/request">
                        <DescriptionIcon color="action"
                        style={{fontSize:40,color:"#161824"}}/>
                        Zahtevi
                    </Button>
                    <Button component={Link} to="/contacts">
                        <ContactMailIcon color="action"
                        style={{fontSize:40,color:"#161824"}}/>
                        Kontakti
                    </Button>
                    </Box>
                </div>
            </AppBar>
            <div>
                <Container maxWidth="sm">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/company" component={() => <Company companies={companies}/>} />
                        <Route exact path="/request" component={Request} />
                        <Route exact path="/contact" component={Contact}/>
                        <Redirect to="/"/>
                    </Switch>
                </Container>
            </div>
        </div>
      <Contact contacts={contacts} /> 
      <Company companies={companies} />
      <Request />
    </Router>
   </>
  );
}

export default App;
