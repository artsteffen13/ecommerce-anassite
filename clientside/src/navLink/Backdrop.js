import React from 'react';

const Backdrop = (props) => {
    return (
        <div
            className="backdrop"
            style={props.sliderOpen ? null : {display: 'none'}}
            onClick={props.sliderController}
        >

        </div>
    );
};

export default Backdrop;
