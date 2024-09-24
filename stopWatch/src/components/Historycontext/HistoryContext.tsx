import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';

export const MyContext = createContext();

export const MyContextProvidor = ({ children }) => {
    const [flag, setFlag] = useState(false);

    return(
        <MyContext.Provider value={{ flag, setFlag }}>
            {children}
        </MyContext.Provider>
    );
};
