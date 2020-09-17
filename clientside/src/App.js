import React, {useEffect, useState} from 'react';
import Header from "./header/Header";
import {Route, Switch} from 'react-router-dom';
import Home from "./home/Home";
import Products from "./products/Products";
import Contact from "./contact/Contact";
import Login from "./login/Login";
import Signup from "./login/Signup";
import axios from 'axios';
import LoginIncorrect from "./login/LoginIncorrect";
import MyAccount from "./login/MyAccount";
import EditAccount from "./login/EditAccount";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [awaitingLogin, setAwaitingLogin] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipcode: ''
        }
    });

    useEffect(() => {
        setAwaitingLogin(true);
        axios.get('/userinfo')
            .then(info => {
                if (info.data.id) {
                    const items = info.data
                    setIsLoggedIn(true)
                    setUserInfo({
                        id: items.id,
                        email: items.email,
                        firstName: items.firstName,
                        lastName: items.lastName,
                        phoneNumber: items.phoneNumber,
                        address: {
                            street: items.address.street,
                            city: items.address.city,
                            state: items.address.state,
                            zipcode: items.address.zipcode
                        }
                    });
                    setAwaitingLogin(false);
                } else {
                    setIsLoggedIn(false)
                    setUserInfo({
                        id: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        address: {
                            street: '',
                            city: '',
                            state: '',
                            zipcode: ''
                        }
                    });
                    setAwaitingLogin(false);
                }

            })
    }, []);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        awaitingLogin={awaitingLogin}
      />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/shirts" component={Products}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/loginIncorrect" component={LoginIncorrect}/>
            <Route
                path='/myaccount'
                render={(props) => <MyAccount {...props} userInfo={userInfo} />}
            />
            <Route
                path='/editaccount'
                render={(props) => <EditAccount {...props} userInfo={userInfo} />}
            />
        </Switch>
    </div>
  );
}

export default App;
