import React from 'react';
import { classForInput } from '../page/css_classes';

const Input = ({ type, name, id }) => {
    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                className={classForInput}
            />
        </>
    );
};

export default Input;