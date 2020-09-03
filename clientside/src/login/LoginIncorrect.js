import React, {useEffect} from 'react';

const LoginIncorrect = () => {
    useEffect(() => {
        alert('Username and/or Password incorrect, please try again');
        window.location.replace('/login');
    })

    return (
        <div>

        </div>
    );
};

export default LoginIncorrect;
