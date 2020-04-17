import React, { useState, useEffect } from 'react';
import {Company} from '../model/Company';
import {Employee} from '../model/Employee';
import {RequestForCooperation} from '../model/RequestForCooperation'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import useStyles from '../company/style'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box'


interface Props{
    companies:Company[];
    employees: Employee[];
    requests:RequestForCooperation[];
    onAdd:(request:RequestForCooperation)=>Promise<any>;
    onUpdate:(request:RequestForCooperation)=>Promise<any>;
    onRemove:()=>Promise<any>;
    selectedRowRequest:number|null;
    onAddMoreDescription:(description:string)=>Promise<any>;
}

interface State{
    requestId:number;
    title:string;
    descriptionOfProposal:string;
    company:Company;
    employee:Employee;
}


const RequestEntrySchema = yup.object().shape({
    id:yup.number()
            .default(0),
    title:yup.string()
                .required('Obavezno polje')
                .min(2,'Naslov zahteva mora imati najmanje dva karaktera')
                .max(30,"Naslov zahteva je predugacak"),
    descriptionOfProposal:yup.string()
                                .required('Obavezno polje')
                                .min(20,'Opis zahteva mora imati najmanje dvadeset karaktera')
                                .max(130,"Opis zahteva je predugacak"),
    company:yup.object().shape({
        
    }).required("Mora biti odabrana kompanija"),
    employee:yup.object().shape({

    }).required("Mora biti odabran zaposleni"),
})




function RequestEntryForm(props:Props){
    const [title,setTitle]=useState<string>('');
    const [descriptionOfProposal,setDescriptionOfProposal]=useState<string>('');
    const [company,setCompany] = useState<Company|null>();
    const [employee,setEmployee] = useState<Employee|null>();
    const [open, setOpen] = React.useState(false);
    const [openEmployee, setOpenEmployee] = React.useState(false);
    const [companyId, setCompanyId] = React.useState(0);
    const [employeeId, setEmployeeId] = React.useState(0);


    const {register,handleSubmit,errors,reset} = useForm<RequestForCooperation>({
        validationSchema:RequestEntrySchema
    })

    const classes=useStyles()

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
      const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        let company_id = event.target.value
        setCompanyId(company_id)
      };

      const handleCloseEmployee = () => {
        setOpenEmployee(false);
      };
    
      const handleOpenEmployee = () => {
        setOpenEmployee(true);
      };
      const handleChangeEmployee = (event: React.ChangeEvent<{ value: any }>) => {
        let employee_id = event.target.value
        setEmployeeId(employee_id)
      };

    useEffect(()=>{
        if(props.selectedRowRequest != null){
            let req:RequestForCooperation=props.requests.find((r:RequestForCooperation)=>r.id===props.selectedRowRequest)!;
            setTitle(req.title);
            setDescriptionOfProposal(req.descriptionOfProposal);
            setCompany(req.company);
            setEmployee(req.employee);
        }
    },[props.selectedRowRequest])

    const onAdd = async(e:any)=>{
        e.preventDefault();
        console.log(companyId,employeeId)
        let companyFor:Company = props.companies.find((comp:Company) => comp.id===companyId)!; 
        let employeeFor:Employee = props.employees.find((emp:Employee) => emp.id===employeeId)!;
        console.log(companyFor,employeeFor,title,descriptionOfProposal)


        if(title !== '' && descriptionOfProposal!=='' && companyFor!==null && companyFor !== undefined && employeeFor!==null && employeeFor !==undefined){
            console.log("RADI")
            await props.onAdd(new RequestForCooperation(0,title,descriptionOfProposal,new Date(),companyFor?companyFor:null,employeeFor?employeeFor:null));
            reset()
        }
    }

    const onRemove = async(e:any)=>{
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate=async(e:any)=>{
        e.preventDefault();
        let companyFor:Company = props.companies.find((comp:Company) => comp.id===companyId)!; 
        let employeeFor:Employee = props.employees.find((emp:Employee) => emp.id===employeeId)!;
        
        if(title !== '' && descriptionOfProposal!=='' && companyFor!==null && companyFor !== undefined && employeeFor!==null && employeeFor !==undefined){
            await props.onUpdate(new RequestForCooperation(props.selectedRowRequest!,title,descriptionOfProposal,new Date(),companyFor?companyFor:null,employeeFor?employeeFor:null));
        }
    }

    return(
        <>
            <form className={classes.formContainer}>
            <TextField
                inputRef={register}
                label="Naslov zahteva"
                name="title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title?errors.title.message:''}
                />
            <TextField
                inputRef={register}
                label="Opis zahteva"
                name="descriptionOfProposal"
                variant="outlined"
                value={descriptionOfProposal}
                onChange={(e) => setDescriptionOfProposal(e.target.value)}
                multiline
                rows={8}
                fullWidth
                error={!!errors.descriptionOfProposal}
                helperText={errors.descriptionOfProposal?errors.descriptionOfProposal.message:''}
             />

                <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Grad odakle je kompanija</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={companyId}
                        onChange={handleChange}
                        >
                            {props.companies.map((comp)=>(
                            <MenuItem value={comp.id} key={comp.name}>
                                {comp.name}
                            </MenuItem>
                            ))}
                        </Select>
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Grad odakle je kompanija</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openEmployee}
                        onClose={handleCloseEmployee}
                        onOpen={handleOpenEmployee}
                        value={employeeId}
                        onChange={handleChangeEmployee}
                        >
                            {props.employees.map((emp)=>(
                            <MenuItem value={emp.id} key={emp.id}>
                                {emp.firstName+" "+emp.lastName}
                            </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                    
                <Box display="flex" justifyContent="flex-end">
                    <Button  color="primary" variant="contained" onClick={onAdd}>Dodaj zahtev</Button>
                </Box>

                <Box display="flex" justifyContent="flex-end">
                    <Button  color="default" variant="contained" disabled={props.selectedRowRequest===null} onClick={onUpdate}>Sacuvaj izmene</Button>
                </Box>

                <Box display="flex" justifyContent="flex-end">
                    <Button  color="secondary" variant="contained" disabled={props.selectedRowRequest===null} onClick={onRemove}>Obrisi zahtev</Button>
                </Box>

            </form>
        </>
    );
}
export default RequestEntryForm;