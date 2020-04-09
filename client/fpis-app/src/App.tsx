import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './navbar/navbar'
import { Contact as ContactModel } from './model/Contact';
import {getAllContacts} from './service/api'
import { promises } from 'dns';
import Contact from './contact/index'

interface State{
  contacts:ContactModel[]
}


function App() {

  let [contacts,setContacts] = useState<ContactModel[]>([])


  const getContacts = async()=>{
    try{
      setContacts(await getAllContacts())
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    (async function(){
      await getContacts();
    })();
  },[])

  return (
   <>
    <Router>
      <NavBar/>
      <Contact contacts={contacts} /> 
    </Router>
   </>
  );
}

export default App;
