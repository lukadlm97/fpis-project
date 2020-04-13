import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import {useForm} from 'react-hook-form'
import {Company} from '../model/Company'
import {Location} from '../model/Location'
import * as yup from 'yup'
import useStyles from './style'

const CompanyEntrySchema = yup.object().shape({
    id:yup.number()
        .default(0),
    name:yup
    .string()
    .trim()
    .required('Obavezno polje')
    .min(2,'Naziv kompanije mora imati najmanje dva karaktera')
    .max(30,"Naziv kompanije je predugacak"),
    locations:yup.array()
                    .of(
                        yup.object().shape({
                            id:yup.number()
                                .default(0),
                            streetName:yup.string()
                                        .required('Naziv ulice je obavezno polje')
                                        .min(3,'Naziv ulice mora biti duzi od 3 karaktera.')
                                        .max(30,'Naziv ulice ne moze biti duzi od 30 karaktera'),
                            number:yup.number()
                                        .required('Morate uneti broj u ulici. (0-ukoliko je bez broja)'),
                            storey:yup.number()
                                        .notRequired()
                                        .default(0),
                            door:yup.number()
                                        .notRequired()
                                        .default(0),            
                            city:yup.object().shape({
                                            id:yup.number(),
                                            name:yup.string(),
                                            postalCode:yup.string()
                            }).required("Morate odabrati grad!")
                        })
                    ).required('Mora se uneti adresa!')
});



const CompanyEntryForm =()=>{

    const {register,handleSubmit,errors,reset} = useForm<Company>({
        validationSchema:CompanyEntrySchema
    })

    const onSubmit = (data:Company):void=>{
        console.log(data)
        reset()
    }
    const classes=useStyles()

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className={classes.formContainer}>
                <TextField
                inputRef={register}
                label="Naziv kompanije"
                name="name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?errors.name.message:''}
                />

                <TextField
                inputRef={register}
                label="Naziv ulice"
                name='locations[0].streetName'
                variant="outlined"
                fullWidth
                error={!!errors.locations}
                helperText={errors.locations?errors.locations.values:''}
                />
                <TextField
                inputRef={register}
                label="Broj u ulici"
                name="locations[0].number"
                variant="outlined"
                fullWidth
                error={!!errors.locations}
                helperText={errors.locations?errors.locations.values:''}
                />
                <TextField
                inputRef={register}
                label="Sprat na kom se nalazi kompanija"
                name="locations[0].storey"
                variant="outlined"
                fullWidth
                error={!!errors.locations}
                helperText={errors.locations?errors.locations.values:''}
                />
                <TextField
                inputRef={register}
                label="Broj stana u kom se nalazi kompanija"
                name="locations[0].door"
                variant="outlined"
                fullWidth
                error={!!errors.locations}
                helperText={errors.locations?errors.locations.values:''}
                />


                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" color="primary" variant="contained" >Dodaj kompaniju</Button>
                </Box>
            </form>
        </>
    )
}

export default CompanyEntryForm;