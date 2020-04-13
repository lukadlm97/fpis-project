import {makeStyles,Theme, createStyles } from '@material-ui/core/styles'


export default makeStyles((theme: Theme) =>createStyles({
    formContainer:{
        margin:'1rm',
        '& .MuiTextField-root':{
            margin:'1rem 0'
        },
    },
            button: {
                display: 'block',
                marginTop: theme.spacing(2),
              },
              formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
              },
}));