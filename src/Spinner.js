import React from 'react';
import './Spinner.css';

const spinner = () => {
    return (
        <div className="lds-ellipsis centered"><div></div><div></div><div></div><div></div></div>
    );
}

export default spinner;