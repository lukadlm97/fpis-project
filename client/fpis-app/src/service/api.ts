import {Contact} from '../model/Contact'
import {ContactResponse} from '../model/ContactResponse'
import axios from 'axios'

const baseUrl = "https://localhost:44360/api/company"

export async function getAllContacts(){
   let res = await fetch(baseUrl+'/contacts')
    let contacts = await res.json();
    var dataStr = JSON.stringify(contacts)

    console.log(dataStr)
    try{
        contacts = JSON.parse(dataStr)
    }catch(e){
        console.log(false)
    }
    
    return contacts.map((contact:any)=>({...contact}));
}