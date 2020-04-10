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

export async function getAllCompanies(){
    let res = await fetch("https://localhost:44360/api/company")
    let companies = await res.json()
    var datStr = JSON.stringify(companies)
    console.log(datStr)
    try{
        companies = JSON.parse(datStr)
    }catch(e){
        console.log(e)
    }
    return companies.map((company:any)=>({...company}))
}