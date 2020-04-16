import React from 'react'
import CompanyEntryForm from './companyForm'
import Company from './companyTab'
import {City} from '../model/City'
import {Company as CompanyModel} from '../model/Company'
import Functionality from './functionality'
import LocationForm from './companyAddNewLocationForm';
import { Contact } from '../model/Contact'
import {Location} from '../model/Location'
import ContactForm from './contactForm'


interface Props{
    cities:City[];
    companies:CompanyModel[];
    selectedRowCompany:number|null;
    setSelectedRowCompany:(id:number|null)=>any;
    onAddCompany:(company:CompanyModel)=>Promise<any>;
    onRemoveCompany:()=>Promise<any>;
    onAddContact:(contact:Contact,id:number|null)=>Promise<any>;
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
        <LocationForm cities={props.cities}
                        selectedRowCompany={props.selectedRowCompany}
                        onAddLocation={props.onAddLocation}
                     />
        <ContactForm selectedRowCompany={props.selectedRowCompany}
                        onAddContact={props.onAddContact} />

    </>
    )
}

export default CompanyController