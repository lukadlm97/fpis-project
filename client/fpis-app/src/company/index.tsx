import React from 'react'
import CompanyEntryForm from './companyForm'
import Company from './companyTab'
import {City} from '../model/City'
import {Company as CompanyModel} from '../model/Company'
import Functionality from './functionality'
import ContactForm from './companyAddNewLocationForm';
import { Contact } from '../model/Contact'
import {Location} from '../model/Location'


interface Props{
    cities:City[];
    onAddCompany:(company:CompanyModel)=>Promise<any>;
    companies:CompanyModel[];
    selectedRowCompany:number|null;
    setSelectedRowCompany:(id:number|null)=>any;
    onRemoveCompany:()=>Promise<any>;
    onAddContact:(contact:Contact,id:number)=>Promise<any>;
    onAddLocation:(location:Location,id:number|null)=>Promise<any>
}


function CompanyController(props:Props){
    return (
    <>
        <Company companies={props.companies}
                    selectedRowCompany={props.selectedRowCompany}
                    setSelectedRowCompany={props.setSelectedRowCompany}/>
        
        <Functionality onRemoveCompany={props.onRemoveCompany} 
                        selectedRowCompany={props.selectedRowCompany}/>
        
        <CompanyEntryForm cities={props.cities}
                            onAddCompany={props.onAddCompany}/>
        <ContactForm cities={props.cities}
                        selectedRowCompany={props.selectedRowCompany}
                        onAddLocation={props.onAddLocation}
                     />
    
    </>
    )
}

export default CompanyController