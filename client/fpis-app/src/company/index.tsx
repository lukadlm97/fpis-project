import React from 'react'
import {Company as CompanyItem} from '../model/Company'
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme, createStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize:18,
      fontWeight:"bold"
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#727bb8'
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface Props{
    companies:CompanyItem[]
}

function Company(props:Props){
    const classes = useStyles();
    return(
        <>
            <h1>Strana za kompanije</h1>
              


               

                <TableContainer component={Paper}>
                    <Table  style={{border:'7px solid grey'}}
                            className={classes.table} 
                            aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    Naziv kompanije:
                                </StyledTableCell>
                                <StyledTableCell>
                                    Grad kompanije:
                                </StyledTableCell>
                                <StyledTableCell>
                                    Ulica kompanije:
                                </StyledTableCell>
                                <StyledTableCell>
                                    Email kompanije:
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.companies.map((company)=>(
                                <StyledTableRow key={company.name}>
                                <StyledTableCell>
                                   {company.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {company.locations.length===0?"Kompanija nema lokaciju":company.locations[company.locations.length-1].city.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                {company.locations.length===0?"Kompanija nema lokaciju":company.locations[company.locations.length-1].streetName}  
                                </StyledTableCell>
                                <StyledTableCell>
                                {company.contacts.length===0?"Kompanija nema kontakte":company.contacts[company.contacts.length-1].content}
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>                
           
        </>
    );
}

export default Company