import React, { useState, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen'
import MusicScreen from '../screens/MusicScreen'
import EvaluationScreen from '../screens/EvaluationScreen'
import PartnersScreen from '../screens/PartnersScreen'
import UserScreen from '../screens/UserScreen'
import {Context as AuthContext} from '../context/AuthContext'


const CustomNav = ({adminStack}) => {
    const {state} = useContext(AuthContext);
    const Drawer = createDrawerNavigator();
    

    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Početna' }}/>
            <Drawer.Screen name="Music" component={MusicScreen} options={{ drawerLabel: 'Muzika' }}/>
            <Drawer.Screen name="Evaluacije" component={EvaluationScreen} />
            <Drawer.Screen name="Partners" component={PartnersScreen} options={{drawerLabel: 'Partneri'}}/>
            <Drawer.Screen name="User" component={UserScreen} options={{ drawerLabel: 'Nalog' }}/>
            {state.track === '4' 
            ?  <Drawer.Screen name="Admin" component={adminStack} 
                options={{
                    drawerIcon: () => <FontAwesome5 name="user-cog" size={24} color="black" />
                }}/>
            : null}
      </Drawer.Navigator>
    )
}

export default CustomNav;