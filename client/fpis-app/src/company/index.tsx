import React from 'react'
import {Company as CompanyItem} from '../model/Company'

interface Props{
    companies:CompanyItem[]
}

function Company(props:Props){
    return(
        <>
            <h1>Strana za kompanije</h1>
            {props.companies.map(comp =><h6>{comp.id}</h6>)}
        </>
    );
}

export default Company