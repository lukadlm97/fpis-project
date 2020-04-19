import React,{useState} from 'react'
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
    const [visibleCompanyForm,setVisibleCompanyForm] = useState(false)
    const [visibleContactForm,setVisibleContactForm] = useState(false)
    const [visibleAddressForm,setVisibleAddressForm] = useState(false)

    return (
    <>
        <Company companies={props.companies}
                    selectedRowCompany={props.selectedRowCompany}
                    setSelectedRowCompany={props.setSelectedRowCompany}
                    setVisibleCompanyForm = {setVisibleCompanyForm}/>
        
        <Functionality onRemoveCompany={props.onRemoveCompany} 
                        selectedRowCompany={props.selectedRowCompany}
                        setVisibleCompanyForm={setVisibleCompanyForm}
                        visibleCompanyForm={visibleCompanyForm}
                        setVisibleContactForm={setVisibleContactForm}
                        visibleContactForm={visibleContactForm}
                        setVisibleAddressForm = {setVisibleAddressForm}
                        visibleAddressForm={visibleAddressForm}/>
        
       {visibleCompanyForm? <CompanyEntryForm cities={props.cities}
                            onAddCompany={props.onAddCompany}
                            setVisibleCompanyForm={setVisibleCompanyForm}/>:null}
        {visibleAddressForm?<LocationForm cities={props.cities}
                        selectedRowCompany={props.selectedRowCompany}
                        onAddLocation={props.onAddLocation}
                        setVisibleAddressForm={setVisibleAddressForm}
                     />:null}
       {visibleContactForm? <ContactForm selectedRowCompany={props.selectedRowCompany}
                        onAddContact={props.onAddContact}
                        setVisibleContactForm={setVisibleContactForm} />:null}

    </>
    )
}

export default CompanyController