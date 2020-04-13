import React from 'react'
import CompanyEntryForm from '../company/companyForm'
import {City} from '../model/City'

interface Props{
    cities:City[]
}

function Home(props:Props){
    return(
        <>
            <h1>Pocetna strana</h1>
            <CompanyEntryForm cities={props.cities}/>
        </>
    );
}

export default Home