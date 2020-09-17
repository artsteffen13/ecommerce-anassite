import React, {useState} from 'react';
import './contact.css';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#8751DB',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#80DB3B',
            },
            '&:hover fieldset': {
                borderColor: '#8751DB',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#8751DB',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
        maxWidth: '350px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const Contact = () => {

    const classes = useStyles();

    return (
        <div className='animate__animated animate__fadeIn'>
            <ContactMailOutlinedIcon style={{fontSize: '80px', margin: '30px 0 0 0', color: '#8751DB'}}/>
            <h2 className='contact'>Our goal is provide you with a quality product and a
                great experience, if you feel for any reason our product or your experience did not meet your
                expectations, or if you have any general questions, feel free to fill out the form below. Please allow
                24 hours for a response.</h2>
            <form
                className={classes.root}
                noValidate
            >
                <CssTextField
                    className={classes.margin}
                    label="Your Email"
                    variant="outlined"
                    id="username"
                    name="username"
                />
                <CssTextField
                    className={classes.margin}
                    label="Subject"
                    variant="outlined"
                    id="subject"
                    name="subject"
                />
                <CssTextField
                    className={classes.margin}
                    label="Comments"
                    variant="outlined"
                    id="body"
                    name="body"
                    multiline
                    rows='5'
                />
                <input type="submit" value="Submit" className="button" />
            </form>
        </div>
    );
};

export default Contact;
