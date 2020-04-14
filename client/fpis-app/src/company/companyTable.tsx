import React,{Component, useState} from 'react'
import {Company} from '../model/Company'
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



interface Props{
    companies:Company[],
    selectedRowCompany:number|null;
    setSelectedRowCompany:(id:number|null)=>any;
}

interface Column {
    id: 'name' | 'city' | 'address' | 'email' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'city', label: 'City', minWidth: 100 },
    {
      id: 'address',
      label: 'Address',
      minWidth: 170,
      align: 'right'
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'right'
    },
  ];


const useStyles = makeStyles({
    root:{width:'100%'},
    container:{maxHeight:440}
})


const classes = useStyles();
const [page,setPage] = React.useState(0);
const [rowsPerAge,setRowsPerPage] = useState(10);
function companyTable(props:Props){

    const handleChangePage = (event:unknown,newPage:number)=>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value)
        setPage(0);
    }


    return(
        <>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column)=>(
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.companies.slice(page*rowsPerAge,page*rowsPerAge+rowsPerAge).map((company)=>{
                            return(
                                <TableRow hover role="checkbox" tabIndex={-1} key={company.id}>
                                    <TableCell key={company.id}>
                                            {company.name}
                                    </TableCell>
                                    <TableCell key={company.id}>
                                            {company.locations[company.locations.length-1].city.name}
                                    </TableCell>
                                    <TableCell key={company.id}>
                                            {company.locations[company.locations.length-1].streetName}
                                    </TableCell>
                                    <TableCell key={company.id}>
                                            {company.contacts[company.contacts.length-1].content}
                                    </TableCell>
                                </TableRow>
                            );

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
          <TablePagination 
          rowsPerPageOptions={[10,25,100]}
          component="div"
          count={props.companies.length}
          rowsPerPage={rowsPerAge}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        
        
        
        </>
    );

}

export default companyTable;