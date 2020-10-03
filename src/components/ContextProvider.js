import React from 'react';
import {Provider as AuthProvider} from '../context/AuthContext'
import {Provider as MusicProvider} from '../context/MusicContext'
import {Provider as SessionProvider} from '../context/SessionContext'
import {Provider as SugarCubesProvider} from '../context/SugarCubesContext'

const Spacer = ({children}) => {
    return  <AuthProvider>
                <MusicProvider>
                    <SessionProvider>
                        <SugarCubesProvider>
                            {children}
                        </SugarCubesProvider>
                    </SessionProvider>
                </MusicProvider>
            </AuthProvider>
}  

export default Spacer;