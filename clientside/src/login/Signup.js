import React, {useState} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './login.css';
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorUserExists, setErrorUserExists] = useState(false);
    const [errorFieldsRequired, setErrorFieldsRequired] = useState(false);

    const classes = useStyles();

    const createProfile = (e) => {
        e.preventDefault();
        axios.post('/signup/newuser', signUpInfo)
            .then(info => {
                if (info.data === 'Success!') {
                    setOpen(true);
                    setTimeout(() => {
                        window.history.back();
                    }, 3000);
                }
                if (info.data === 'user exists') {
                    setErrorUserExists(true);
                }
                if (info.data === 'all fields required') {
                    setErrorFieldsRequired(true);
                }
            })
            .catch(() => {
                setErrorOpen(true);
            })
    };

    const handleLoginInfoChange = (e) => {
        const {name, value} = e.target;
        setSignUpInfo(prevValues => {
            return (
                {...prevValues, [name]: value}
            )
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
        setErrorUserExists(false);
        setErrorFieldsRequired(false);
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
                    style={{minWidth: '180px', maxWidth: '180px'}}
                />
                <CssTextField
                    className={classes.margin}
                    type="text"
                    label="State"
                    variant="outlined"
                    id="select"
                    name="state"
                    value={signUpInfo.state}
                    onChange={handleLoginInfoChange}
                    style={{minWidth: '90px', maxWidth: '90px'}}
                    select
                >
                    <MenuItem value="AL">AL</MenuItem>
                    <MenuItem value="AK">AK</MenuItem>
                    <MenuItem value="AZ">AZ</MenuItem>
                    <MenuItem value="AR">AR</MenuItem>
                    <MenuItem value="CA">CA</MenuItem>
                    <MenuItem value="CO">CO</MenuItem>
                    <MenuItem value="CT">CT</MenuItem>
                    <MenuItem value="DE">DE</MenuItem>
                    <MenuItem value="FL">FL</MenuItem>
                    <MenuItem value="GA">GA</MenuItem>
                    <MenuItem value="HI">HI</MenuItem>
                    <MenuItem value="ID">ID</MenuItem>
                    <MenuItem value="IL">IL</MenuItem>
                    <MenuItem value="IN">IN</MenuItem>
                    <MenuItem value="IA">IA</MenuItem>
                    <MenuItem value="KS">KS</MenuItem>
                    <MenuItem value="KY">KY</MenuItem>
                    <MenuItem value="LA">LA</MenuItem>
                    <MenuItem value="ME">ME</MenuItem>
                    <MenuItem value="MD">MD</MenuItem>
                    <MenuItem value="MA">MA</MenuItem>
                    <MenuItem value="MI">MI</MenuItem>
                    <MenuItem value="MN">MN</MenuItem>
                    <MenuItem value="MS">MS</MenuItem>
                    <MenuItem value="MO">MO</MenuItem>
                    <MenuItem value="MT">MT</MenuItem>
                    <MenuItem value="NE">NE</MenuItem>
                    <MenuItem value="NV">NV</MenuItem>
                    <MenuItem value="NH">NH</MenuItem>
                    <MenuItem value="NJ">NJ</MenuItem>
                    <MenuItem value="NM">NM</MenuItem>
                    <MenuItem value="NY">NY</MenuItem>
                    <MenuItem value="NC">NC</MenuItem>
                    <MenuItem value="ND">ND</MenuItem>
                    <MenuItem value="OH">OH</MenuItem>
                    <MenuItem value="OK">OK</MenuItem>
                    <MenuItem value="OR">OR</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                    <MenuItem value="RI">RI</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="SD">SD</MenuItem>
                    <MenuItem value="TN">TN</MenuItem>
                    <MenuItem value="TX">TX</MenuItem>
                    <MenuItem value="UT">UT</MenuItem>
                    <MenuItem value="VT">VT</MenuItem>
                    <MenuItem value="VA">VA</MenuItem>
                    <MenuItem value="WA">WA</MenuItem>
                    <MenuItem value="WV">WV</MenuItem>
                    <MenuItem value="WI">WI</MenuItem>
                    <MenuItem value="WY">WY</MenuItem>
                </CssTextField>
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
            <Snackbar open={open}>
                <Alert severity="success">
                    Success! Please log in.
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Something went wrong, please try again!
                </Alert>
            </Snackbar>
            <Snackbar open={errorUserExists} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Username already exists!
                </Alert>
            </Snackbar>
            <Snackbar open={errorFieldsRequired} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    All fields required!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;
