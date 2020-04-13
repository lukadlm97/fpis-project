import {Contact} from '../model/Contact'
import {ContactResponse} from '../model/ContactResponse'
import axios from 'axios'
import { Company } from '../model/Company'

const baseUrl = "https://localhost:44360/api"

export async function getAllContacts(){
   let res = await fetch(baseUrl+'/company/contacts')
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
    let res = await fetch(baseUrl+"/company")
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

export async function getAllRequests(){
    let res = await fetch(baseUrl+'/cooperation')
    let cooperations = await res.json()
    var dataStr = JSON.stringify(cooperations)
    try{
        cooperations = JSON.parse(dataStr)
    }catch(e){
        console.log(e)
    }
    return cooperations.map((cooperation:any)=>({...cooperation}))
}

export async function getAllCities(){
    let res = await fetch(baseUrl+'/company/cities')
    let cities = await res.json()
    var dataStr = JSON.stringify(cities)
    try{
        cities = JSON.parse(dataStr)
    }catch(e){
        console.log(e)
    }
    return cities.map((cities:any)=>({...cities}))
}

export async function addNewCompany(company:Company) {
    let {id,...comp} = company
    let res = await fetch(baseUrl+'/company',{
        method:'POST',
        body:JSON.stringify(comp),
        headers:{
            'Content-Type':'application/json'
        }
    });
    return await res.json()
}