import React from 'react'
import { RequestForCooperation as RequestForCooperationItem, RequestForCooperation} from '../model/RequestForCooperation';
import {Company} from '../model/Company'
import {Employee} from '../model/Employee'

import RequestTable from './tableForRequests'
import RequestEntryForm from './requestForm'

interface Props{
    requests:RequestForCooperationItem[];
    companies:Company[];
    employees:Employee[];
    selectedRowRequest:number|null;
    setSelectedRowRequest:(id:number|null)=>any;
    onAddRequest:(request:RequestForCooperationItem)=>Promise<any>;
    onRemoveRequest:()=>Promise<any>;
    onUpdateRequest:(request:RequestForCooperationItem)=>Promise<any>;
    onAddMoreDescription:(description:string)=>Promise<any>;
}


function RequestController(props:Props){
    return(
        <>
        <RequestTable requests={props.requests}
                        selectedRowRequest={props.selectedRowRequest}
                        setSelectedRowRequest={props.setSelectedRowRequest}
                        />
        <RequestEntryForm employees={props.employees}
                            companies={props.companies}
                            selectedRowRequest={props.selectedRowRequest}
                            onAdd={props.onAddRequest}
                            onUpdate={props.onUpdateRequest}
                            onRemove={props.onRemoveRequest}
                            requests={props.requests}
                            onAddMoreDescription={props.onAddMoreDescription}/>
        </>
    );
}


export default RequestController;