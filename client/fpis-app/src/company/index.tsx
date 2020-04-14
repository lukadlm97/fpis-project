import React from 'react'
import CompanyEntryForm from './companyForm'
import Company from './companyTab'
import {City} from '../model/City'
import {Company as CompanyModel} from '../model/Company'



interface Props{
    cities:City[];
    onAddCompany:(company:CompanyModel)=>Promise<any>;
    companies:CompanyModel[];
    selectedRowCompany:number|null;
    setSelectedRowCompany:(id:number|null)=>any;
}


function CompanyController(props:Props){
    return (
    <>
    <Company companies={props.companies}
                selectedRowCompany={props.selectedRowCompany}
                setSelectedRowCompany={props.setSelectedRowCompany}/>
    <CompanyEntryForm cities={props.cities}
                        onAddCompany={props.onAddCompany}/>
    </>
    )
}

export default CompanyController