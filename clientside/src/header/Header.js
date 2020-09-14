import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import './header.css';
import MainNavItem from "../navLink/MainNavItem";
import logo from '../images/anaslogo.png';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        axios.get('/logout')
            .then(info => {
                if (info.data === 'Successfully logged out') {
                    window.location.href = '/'
                }
            })

            .catch(err => alert(err))
    }

    return (
        <div className={classes.root}>
            <AppBar
                className="background animate__animated animate__fadeIn"
                style={{
                    flexDirection: 'row',
                    background: 'linear-gradient(0.25turn, #80DB3B, #80DB3B, #46DB66)',
                    position: 'relative'
                }}
            >
                <img alt="logo" src={logo} style={{width: '100px', margin: '0 20px 0 0'}}/>
                <MainNavItem link="/" class="main-nav-link" active="active">
                    Home
                </MainNavItem>
                <MainNavItem link="/shirts" class="main-nav-link" active="active">
                    Shirts
                </MainNavItem>
                <MainNavItem link="/contact" class="main-nav-link" active="active">
                    Contact
                </MainNavItem>
                <span style={{position: 'absolute', top: '20px', right: '40px', borderBottom: 'none'}}>
                    <MainNavItem link="#" class="secondary-nav-link" active={null}>
                    <ShoppingCartOutlinedIcon style={{fontSize: '31px'}}/>
                </MainNavItem>
                    <span style={props.isLoggedIn ? {display: "none"} : {}}>
                <MainNavItem link="/login" class="main-nav-link" active="active">
                    Login / Sign Up
                </MainNavItem>
                    </span>
                    <span
                        style={!props.isLoggedIn ? {display: "none"} : {}}
                    >
                    <MainNavItem link="#" class="secondary-nav-link" active={null}>
                    <AccountCircleOutlinedIcon
                        style={{fontSize: '31px'}}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    />
                </MainNavItem>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
        <MenuItem onClick={handleClose}>Orders</MenuItem>
                            <MenuItem
                                onClick={handleClose}
                            >
                                <NavLink
                                    to="/myaccount"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                >
                                    My Account
                                </NavLink>
                            </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
                    </span>
                    </span>
            </AppBar>
        </div>
    );
};

export default Header;
