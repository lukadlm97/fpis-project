import React from 'react'
import { RequestForCooperation as RequestForCooperationItem} from '../model/RequestForCooperation';


interface Props{
    requests:RequestForCooperationItem[]
}

function Request(props:Props) {
    return(
        <>
            <h1>Stranica za zahteve za saradnju</h1>
            {props.requests.map(request=>
                <h5>{request.id}</h5>
            )}
        </>
    );
}

export default Request