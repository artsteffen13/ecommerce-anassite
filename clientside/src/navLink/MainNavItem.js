import React from 'react';
import {NavLink} from "react-router-dom";
import './navigation.css';

const MainNavItem = (props) => {
    return (
        <NavLink exact to={props.link} activeClassName={props.active} className={props.class}>
            {props.children}
        </NavLink>
    );
};

export default MainNavItem;
