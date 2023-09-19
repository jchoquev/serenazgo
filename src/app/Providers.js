"use client"

import { SessionProvider} from "next-auth/react";
import { store } from "@/Redux/Store/store"
import { Provider } from 'react-redux'
import React from "react";


function Providers({children}){
    return (
        <Provider store={store}>
            <SessionProvider> 
                {children} 
            </SessionProvider>
        </Provider>
    );
}

export default Providers;