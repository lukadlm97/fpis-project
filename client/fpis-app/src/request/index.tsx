import React from 'react'
import { RequestForCooperation as RequestForCooperationItem} from '../model/RequestForCooperation';
import {Company} from '../model/Company'
import {Employee} from '../model/Employee'

import RequestTable from './tableForRequests'

interface Props{
    requests:RequestForCooperationItem[];
    companies:Company[];
    employees:Employee[];
    selectedRowRequest:number|null;
    setSelectedRowRequest:(id:number|null)=>any;
}


function RequestController(props:Props){
    return(
        <RequestTable requests={props.requests}
                        selectedRowRequest={props.selectedRowRequest}
                        setSelectedRowRequest={props.setSelectedRowRequest}
                        />

    );
}


export default RequestController;