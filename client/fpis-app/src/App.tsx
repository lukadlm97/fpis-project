import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './navbar/navbar'
import { Contact as ContactModel } from './model/Contact';
import {getAllEmployee,addNewLocation,addNewCompany,getAllContacts,getAllCompanies,getAllRequests,getAllCities,removeCompany,addNewContact} from './service/api'
import { promises } from 'dns';
import Contact from './contact/index'
import {Company as CompanyModel } from './model/Company';
import Company from './company/index'
import {RequestForCooperation as RequestForCooperationModel} from './model/RequestForCooperation'
import RequestController from './request/index'
import {City as CityModel} from './model/City'
import {Location} from './model/Location'
import {Employee} from './model/Employee'

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



interface State{
  contacts:ContactModel[];
  companies:CompanyModel[];
  requests:RequestForCooperationModel[];
  cities:CityModel[];
  selectedRowCompany:number|null;
  selectedRowRequest:number|null;
}


function App() {

  let [contacts,setContacts] = useState<ContactModel[]>([])
  let [companies,setCompanies] = useState<CompanyModel[]>([])
  let [requests,setRequests] = useState<RequestForCooperationModel[]>([])
  let [cities,setCities] = useState<CityModel[]>([])
  let [error,setError] = useState('')
  let [selectedRowCompany,setSelectedRowCompany] = useState<number|null>(null) 
  let [selectedRowRequest,setSelectedRowRequest] = useState<number|null>(null) 
  let [employees,setEmployees] = useState<Employee[]>([]);

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

  const getRequests = async()=>{
    try{
      setRequests(await getAllRequests())
    }catch(e){
      console.log(e)
    }
  }

  const getCities = async()=>{
    try{
      setCities(await getAllCities())
    }catch(e){
      console.log(e)
    }
  }

  const getEmployees = async()=>{
    try{
      setEmployees(await getAllEmployee())
    }catch(e){
      console.log(e)
    }
  }

  const onAddCompany = async(company:CompanyModel)=>{
    try{
      let res = await addNewCompany(company)
      if(res.error)setError(res.error)
      else setCompanies([...companies,{...res}]);
    }catch(e){
      setError('Network error')
    }
  }

  const onRemoveCompany = async() =>{
    try{
      const companyId = selectedRowCompany!;
      await removeCompany(companyId);
      setCompanies(companies.filter((company:CompanyModel)=>company.id!==companyId));
      setSelectedRowCompany(null)
    }catch(e){
      setError("Network error");
    }
  }

  const onAddNewContact = async(contact:ContactModel) =>{
    try{
      if(selectedRowCompany===null){
        setError("Morate odabrati kompaniju!")
        return;
      }
      const companyId = selectedRowCompany!;
      let res = await addNewContact(contact,companyId);
      console.log(res)
      if(res.error)setError(res.error)
      setSelectedRowCompany(null)
    }catch(e){
      setError(e)
    }
  }
  
  const onAddNewLocation = async(location:Location)=>{
    try{
      if(selectedRowCompany===null){
        setError("Morate odabrati kompaniju!")
        return;
      }
      const companyId = selectedRowCompany!;
      let res = await addNewLocation(location,companyId);
      console.log(res)
      if(res.error)setError(res.error)  
    //  else setCompanies(companies.map((comp:CompanyModel)=>comp.id===selectedRowCompany?comp.locations[comp.locations]))
      setSelectedRowCompany(null)
    }catch(e){
      setError(e)
    }
  }


  useEffect(()=>{
    (async function(){
      await getContacts();
      await getCompanies();
      await getRequests();
      await getCities();
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
                <Container maxWidth="md">
                    <Switch>
                        <Route exact path="/" component={() => <Home onAddCompany={onAddCompany} cities={cities}/>}/>
                        <Route exact path="/company" component={() =>  <Company companies={companies} 
                                                                                cities={cities} 
                                                                                onAddCompany={onAddCompany} 
                                                                                selectedRowCompany={selectedRowCompany}
                                                                                setSelectedRowCompany={setSelectedRowCompany}
                                                                                onRemoveCompany={onRemoveCompany}
                                                                                onAddContact={onAddNewContact}
                                                                                onAddLocation={onAddNewLocation}
                                                                                />}/>
                        <Route exact path="/request" component={() => <RequestController requests={requests}
                                                                                          companies={companies}
                                                                                          employees={employees}
                                                                                          selectedRowRequest={selectedRowRequest}
                                                                                          setSelectedRowRequest={setSelectedRowRequest} />} />
                        <Route exact path="/contact" component={()=> <Contact contacts={contacts} />}/>
                        <Redirect to="/"/>
                    </Switch>
                </Container>
            </div>
        </div>
    </Router>
    {error && <h1>{error}</h1>}
   </>
  );
}

export default App;
