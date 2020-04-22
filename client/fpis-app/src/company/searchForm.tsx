import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

interface Props{
    updateSearch:(e:any)=>void;
    getSearch:(e:any)=>void;
}

function SearchForm(props:Props){
    return(
        <Box>
            
    <form onSubmit={props.getSearch}>
        <TextField
                onChange={props.updateSearch}
                label="Unesite kriterijum pretrage:"
                name="search"
                variant="outlined"
                fullWidth
        />
        <Button type='submit'
               >Restartuj pretragu </Button>
    </form>
        </Box>
    );
}

export default SearchForm;