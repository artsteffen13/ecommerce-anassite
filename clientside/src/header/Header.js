import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import './header.css';
import MainNavItem from "../navLink/MainNavItem";
import logo from '../images/anaslogo.png';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import Backdrop from "../navLink/Backdrop";
import SliderMenu from "../navLink/SliderMenu";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';


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
    const [sliderOpen, setSliderOpen] = useState(false);

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
    };

    const sliderController = () => {
        if (sliderOpen) {
            setSliderOpen(false);
        } else {
            setSliderOpen(true);
        }
    }

    let sliderStyles;
    if (sliderOpen) {
        sliderStyles = 'slider open';
    } else {
        sliderStyles = 'slider close';
    }

    return (
        <div>
            <Backdrop sliderOpen={sliderOpen} sliderController={sliderController}/>
            <div className='full-size'>
                <AppBar
                    className="background animate__animated animate__fadeIn size"
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
            <div className='small-screen'>
                <AppBar
                    className="background animate__animated animate__fadeIn size"
                    style={{
                        background: 'linear-gradient(0.25turn, #80DB3B, #80DB3B, #46DB66)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    {/*<p*/}
                    {/*    onClick={sliderController}*/}
                    {/*    style={{*/}
                    {/*        position: 'absolute',*/}
                    {/*        top: '15px',*/}
                    {/*        left: '55px',*/}
                    {/*        margin: '0',*/}
                    {/*        fontSize: '100%',*/}
                    {/*        fontWeight: 'bold',*/}
                    {/*        color: 'black',*/}
                    {/*        cursor: 'pointer'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    SliderMenu*/}
                    {/*</p>*/}
                    {/*<img*/}
                    {/*    onClick={sliderController}*/}
                    {/*    alt="menu" src={logo}*/}
                    {/*    style={{*/}
                    {/*        width: '100px',*/}
                    {/*        margin: '0 20px 0 0',*/}
                    {/*        cursor: 'pointer'*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <img
                        alt="logo" src={logo}
                        style={{
                            width: '100px',
                            margin: '0 20px 0 0',
                            position: 'absolute',
                            top: '0',
                            right: '20px'
                        }}
                    />
                    <MenuIcon
                        onClick={sliderController}
                        style={{
                            color: '#8751DB',
                            fontSize: '60px',
                            marginTop: '10px',
                            cursor: 'pointer'
                        }}
                    />
                </AppBar>
            </div>
            <div
                className={sliderStyles}
                onClick={sliderController}
            >
                <SliderMenu
                    sliderController={sliderController}
                    isLoggedIn={props.isLoggedIn}
                    logout={logout}
                />
            </div>
        </div>
    );
};

export default Header;
