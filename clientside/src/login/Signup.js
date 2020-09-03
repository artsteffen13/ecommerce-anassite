import React, {useState} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './login.css';
import axios from 'axios';

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
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    margin: {
        margin: theme.spacing(1),
        minWidth: '400px',
        maxWidth: '400px'
    },
}));

const Signup = () => {
    const [signUpInfo, setSignUpInfo] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phoneNumber: ''
    });

    const classes = useStyles();

    const createProfile = (e) => {
        e.preventDefault();
        axios.post('/signup/newuser', signUpInfo)
            .then(info => {
                console.log(info.data);
                alert(info.data);
                if (info.data === 'Success!') {
                    window.location.href = '/login'
                }
            })
            .catch(err => console.log(err))
    };

    const handleLoginInfoChange = (e) => {
        const {name, value} = e.target;
        setSignUpInfo(prevValues => {
            return (
                {...prevValues, [name]: value}
            )
        })
    };

    return (
        <div>
            <h1>Signup</h1>
            <hr/>
            <form onSubmit={createProfile} className={classes.root} noValidate>
                <CssTextField
                    className={classes.margin}
                    label="Email"
                    variant="outlined"
                    id="username"
                    name="username"
                    value={signUpInfo.username}
                    onChange={handleLoginInfoChange}
                />
                <div className="break" />
                <CssTextField
                    className={classes.margin}
                    type="password"
                    label="Password"
                    variant="outlined"
                    id="password"
                    name="password"
                    value={signUpInfo.password}
                    onChange={handleLoginInfoChange}
                />
                <div className="break" />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="First Name"
                    variant="outlined"
                    id="firstName"
                    name="firstName"
                    value={signUpInfo.firstName}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '192px', maxWidth: '192px'}}
                />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    value={signUpInfo.lastName}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '192px', maxWidth: '192px'}}
                />
                <div className="break" />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="Street Address"
                    variant="outlined"
                    id="street"
                    name="street"
                    value={signUpInfo.street}
                    onChange={handleLoginInfoChange}
                />
                <div className="break" />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="City"
                    variant="outlined"
                    id="city"
                    name="city"
                    value={signUpInfo.city}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '200px', maxWidth: '200px'}}
                />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="State"
                    variant="outlined"
                    id="state"
                    name="state"
                    value={signUpInfo.state}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '70px', maxWidth: '70px'}}
                />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="Zipcode"
                    variant="outlined"
                    id="zipcode"
                    name="zipcode"
                    value={signUpInfo.zipcode}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '100px', maxWidth: '100px'}}
                />
                <div className="break" />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="Phone Number"
                    variant="outlined"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={signUpInfo.phoneNumber}
                    onChange={handleLoginInfoChange}
                />
                <div className="break" />
                <input type="submit" value="Submit" className="button" />
            </form>
        </div>
    );
};

export default Signup;
