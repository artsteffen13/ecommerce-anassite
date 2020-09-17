import React from 'react';
import MainNavItem from "./MainNavItem";

const SliderMenu = (props) => {
    return (
        <div
            className='small-screen'
            onClick={props.sliderController}
            style={{
                fontSize: '180%',
                flexDirection: 'column'
            }}
        >
            <MainNavItem
                link='/'
                class='slider-nav'
                active='active'
            >
                Home
            </MainNavItem>
            <MainNavItem
                link='/shirts'
                class='slider-nav'
                active='active'
            >
                Shirts
            </MainNavItem>
            <MainNavItem
                link='/contact'
                class='slider-nav'
                active='active'
            >
                Contact
            </MainNavItem>
            <MainNavItem
                link='/cart'
                class='slider-nav'
                active='active'
            >
                Cart
            </MainNavItem>

            <span style={props.isLoggedIn ? {display: "none"} :
                {display: 'flex', flexDirection: 'column'}}
            >
            <MainNavItem link="/login" class="slider-nav" active="active">
                Login / Sign Up
            </MainNavItem>
            </span>
            <span style={!props.isLoggedIn ? {display: "none"} :
                {display: 'flex', flexDirection: 'column'}}
            >
            <MainNavItem link="/myaccount" class="slider-nav" active="active">
                Account
            </MainNavItem>
                <MainNavItem link="/orders" class="slider-nav" active="active">
                Orders
            </MainNavItem>
                <span className="slider-nav" style={{cursor: 'pointer'}} onClick={props.logout}>
                    Logout
            </span>
            </span>

        </div>
    );
};

export default SliderMenu;
