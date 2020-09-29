import React, { useState, useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen'
import MusicScreen from '../screens/MusicScreen'
import EvaluationScreen from '../screens/EvaluationScreen'
import PartnersScreen from '../screens/PartnersScreen'
import PartnerOverview from '../screens/partners/PartnerOverview'
import ChatScreen from '../screens/ChatScreen'
import UserScreen from '../screens/UserScreen'
import {Context as AuthContext} from '../context/AuthContext'
import Custom from '../components/CustomHeader'


const CustomNav = ({adminStack}) => {
    const {state} = useContext(AuthContext);
    const Drawer = createDrawerNavigator();
    const PartnersFlow = createStackNavigator();
    

    function PartnersStack() {
        return (
            <PartnersFlow.Navigator>
              <PartnersFlow.Screen name="Partners" component={PartnersScreen}/>
              <PartnersFlow.Screen  name="Overview" component={PartnerOverview}/>
            </PartnersFlow.Navigator>
        );
      }

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

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
})
   
export default CustomNav;