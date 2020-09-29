import React from 'react';
import {Provider as AuthProvider} from '../context/AuthContext'
import {Provider as MusicProvider} from '../context/MusicContext'
import {Provider as SessionProvider} from '../context/SessionContext'

const Spacer = ({children}) => {
    return  <AuthProvider>
                <MusicProvider>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </MusicProvider>
            </AuthProvider>
}  

export default Spacer;