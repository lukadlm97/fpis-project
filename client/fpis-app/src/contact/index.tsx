import React from 'react'
import {Contact as ContactItem} from '../model/Contact'

interface Props{
    contacts:ContactItem[]
}


function Contact(props:Props){
    return(
        <>
            <h1>Stranica za kontakte</h1>
            {props.contacts.map(cont => <h6>{cont.id}</h6>)}
        </>
    );
}

export default Contact