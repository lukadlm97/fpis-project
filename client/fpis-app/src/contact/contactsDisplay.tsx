import React from 'react'
import {Company as CompanyItem} from '../model/Company'
import {ContactType} from '../model/enum/ContactType'

interface Props{
    companies:CompanyItem[]
}


function TableContacts(props:Props){
    return(
        <>
            <h2>Emailovi:</h2>
           {props.companies.map(comp=>{
               <h4>{comp.name}:</h4>
               {comp.contacts.map(contact=>{
                    if(contact.contactType===ContactType.Email){
                    <h6>{contact.content}</h6>
                    }
               })}
           })}
        </>
    );
}

export default TableContacts;