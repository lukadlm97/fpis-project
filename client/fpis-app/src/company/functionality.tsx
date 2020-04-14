import React from 'react'
import { Button,Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactsIcon from '@material-ui/icons/Contacts';
import HouseIcon from '@material-ui/icons/House';




interface Props{
    onRemoveCompany:()=>Promise<any>;
    selectedRowCompany:number|null;
}


function Functionality(props:Props){
    
    const onRemove = async (e:any)=>{
        e.preventDefault();
        await props.onRemoveCompany();
    }

    return(
        <Box ml={10} pl={2} mt={4} mb={4}>
            <Box ml={2} pl={2}>
                <Button variant="contained" color="secondary" onClick={onRemove} disabled={props.selectedRowCompany === null}>
                    <DeleteIcon style={{fontSize:20,color:"#727bb8"}} />
                    Obrisi kompaniju
                </Button>
            </Box>
            <Box ml={2} pl={2}>
                <Button variant="contained" color="primary"  disabled={props.selectedRowCompany === null}>
                    <ContactsIcon style={{fontSize:20,color:"#727bb8"}} />
                    Dodaj novi kontakt
                </Button>
            </Box>
            <Box ml={2} pl={2}>
                <Button variant="contained" color="primary"  disabled={props.selectedRowCompany === null}>
                    <HouseIcon style={{fontSize:20,color:"#727bb8"}} />
                    Promeni adresu
                </Button>
            </Box>
        </Box>
    )
}

export default Functionality;