import React, { useState, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import HomeScreen from '../screens/HomeScreen'
import MusicScreen from '../screens/MusicScreen'
import EvaluationScreen from '../screens/evaluations/EvaluationScreen'
import PartnersScreen from '../screens/PartnersScreen'
import UserScreen from '../screens/UserScreen'
import SugarCubeScreen from '../screens/SugarCubeScreen'
import AgendaScreen from '../screens/AgendaScreen'
import Day1Screen from '../screens/agenda/Day1Screen'
import Day2Screen from '../screens/agenda/Day2Screen'
import Day3Screen from '../screens/agenda/Day3Screen'
import Day4Screen from '../screens/agenda/Day4Screen'
import Day5Screen from '../screens/agenda/Day5Screen'
import InfoScreen from '../screens/InfoScreen';
import {Context as AuthContext} from '../context/AuthContext'


const AgendaFlow = createBottomTabNavigator();

function AgendaStack() {
    return (
        <AgendaFlow.Navigator initialRouteName='Agenda'>
          <AgendaFlow.Screen name="Day1" component={Day1Screen}
            options={{
              tabBarLabel: 'Day',
              tabBarIcon: () => <MaterialCommunityIcons name="numeric-1" size={24} color="#F15946" />,
            }}/>
            <AgendaFlow.Screen name="Day2" component={Day2Screen}
            options={{
              tabBarLabel: 'Day',
              tabBarIcon: () => <MaterialCommunityIcons name="numeric-2" size={24} color="#F15946" />,
            }}/>
            <AgendaFlow.Screen name="Day3" component={Day3Screen}
            options={{
              tabBarLabel: 'Day',
              tabBarIcon: () => <MaterialCommunityIcons name="numeric-3" size={24} color="#F15946" />,
            }}/>
            <AgendaFlow.Screen name="Day4" component={Day4Screen}
            options={{
              tabBarLabel: 'Day',
              tabBarIcon: () => <MaterialCommunityIcons name="numeric-4" size={24} color="#F15946" />,
            }}/>
            <AgendaFlow.Screen name="Day5" component={Day5Screen}
            options={{
              tabBarLabel: 'Day',
              tabBarIcon: () => <MaterialCommunityIcons name="numeric-5" size={24} color="#F15946" />,
            }}/>
        </AgendaFlow.Navigator>
    );
  }
  


const CustomNav = ({adminStack}) => {
    const {state} = useContext(AuthContext);
    const Drawer = createDrawerNavigator();
    

    return (
        <Drawer.Navigator initialRouteName="Home" overlayColor="#F15946" >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Početna' }}/>
            <Drawer.Screen name="Music" component={MusicScreen} options={{ drawerLabel: 'Muzika' }}/>
            <Drawer.Screen name="Evaluacije" component={EvaluationScreen} />
            <Drawer.Screen name="Partners" component={PartnersScreen} options={{drawerLabel: 'Partneri'}}/>
            <Drawer.Screen name="Agenda" component={AgendaStack} options={{drawerLabel: 'Agenda'}}/>
            <Drawer.Screen name="User" component={UserScreen} options={{ drawerLabel: 'Nalog' }}/>
            <Drawer.Screen name="Sugar Cubes" component={SugarCubeScreen} options={{ drawerLabel: 'Sugar cubes'}}/>
            <Drawer.Screen name="Info" component={InfoScreen} options={{ drawerLabel: 'Uputstva'}}/>
            {state.isAdmin 
            ?  <Drawer.Screen name="Admin" component={adminStack} 
                options={{
                    drawerIcon: () => <FontAwesome5 name="user-cog" size={24} color="#F15946" />
                }}/>
            : null}
      </Drawer.Navigator>
    )
}

export default CustomNav;