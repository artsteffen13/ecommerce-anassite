import React, {useState} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './login.css';
import {NavLink} from "react-router-dom";

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

    const classes = useStyles();

    const handleLoginInfoChange = (e) => {
        const {name, value} = e.target;
        setLoginInfo(prevValues => {
            return (
                {...prevValues, [name]: value}
            )
        })
    };

    return (
        <div>
            <h1>Login</h1>
            <hr/>
            <form
                className={classes.root}
                noValidate
                method="POST"
                action="/login/authorize"
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
        </div>
    );
};

export default Login;
