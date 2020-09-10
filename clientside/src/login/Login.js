import React, {useState} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './login.css';
import {NavLink} from "react-router-dom";
import axios from 'axios';
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
        flexDirection: 'column',
        width: '350px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const classes = useStyles();

    const login = (e) => {
        e.preventDefault();
        axios.post('/login/authorize', loginInfo)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            })
            .catch(() => {
                setErrorOpen(true);
            })
    }

    const handleLoginInfoChange = (e) => {
        const {name, value} = e.target;
        setLoginInfo(prevValues => {
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
    };

    return (
        <div>
            <h1>Login</h1>
            <hr/>
            <form
                className={classes.root}
                noValidate
                onSubmit={login}
            >
                <CssTextField
                    className={classes.margin}
                    label="Email"
                    variant="outlined"
                    id="username"
                    name="username"
                    value={loginInfo.username}
                    onChange={handleLoginInfoChange}
                />
                <CssTextField
                    className={classes.margin}
                    type="password"
                    label="Password"
                    variant="outlined"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleLoginInfoChange}
                />
                <input type="submit" value="Submit" className="button" />
            </form>
            <p>Not signed up yet? <NavLink
                style={{textDecoration: 'none', color: '#8751DB'}}
                to="/signup"
            >
                <b>Click here</b>
            </NavLink>
            </p>
            <Snackbar open={open}>
                <Alert severity="success">
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Username and/or Password incorrect, please try again!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
