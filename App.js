import 'react-native-gesture-handler';
import React, {useState, useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import {Provider as MusicProvider} from './src/context/MusicContext'
import ContextProvider from './src/components/ContextProvider'
import { HomeTitleContext } from './src/context/HeaderContext';
import { navigationRef, isReadyRef } from './RootNavigation';
import AdminHomeScreen from './src/screens/admin/AdminHomeScreen'
import AdminEvaluationScreen from './src/screens/admin/AdminEvaluationScreen'
import AdminLCPage from './src/screens/admin/AdminLCPage'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import UserScreen from './src/screens/UserScreen'
import CustomHeader from './src/components/CustomHeader'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomNav from './src/components/CustomNav'


const Main = createStackNavigator();
const LoginFlow = createStackNavigator();
const AdminFlow = createBottomTabNavigator();
let globalState = {track: 0};


function MenuStackSecond() {
  return (
      <CustomNav adminStack={AdminStack}/>
  );
}

function AuthStack() {
  return (
      <LoginFlow.Navigator headerMode='none'>
        <LoginFlow.Screen name="Signup" component={SignupScreen} />
        <LoginFlow.Screen name="Signin" component={SigninScreen} />
      </LoginFlow.Navigator>
  );
}

function AdminStack() {
  return (
      <AdminFlow.Navigator initialRouteName='AdminHome'>
        <AdminFlow.Screen name="AdminHome" component={AdminHomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
          }}/>
        <AdminFlow.Screen name="Evaluacije" component={AdminEvaluationScreen} 
          options={{
            tabBarLabel: 'Evaluacije',
            tabBarIcon: () => <FontAwesome name="wpforms" size={24} color="black" />,
          }}/>
        <AdminFlow.Screen name="Prijave" component={AdminLCPage} 
        options={{
          tabBarLabel: 'Prijave',
          tabBarIcon: () => <FontAwesome5 name="users" size={24} color="black" />,
        }}/>
      </AdminFlow.Navigator>
  );
}


export default function App() {
  const [title, setTitle] = useState('Početna');
  

  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <HomeTitleContext.Provider
            value={{
                title,
                setTitle,
            }}
        >
            <HomeTitleContext.Consumer>
                {(ctx) => (

                <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                  isReadyRef.current = true;
                }}>
                <ContextProvider>
                    <Main.Navigator>
                        <Main.Screen 
                          name="AuthResolver" 
                          component={ResolveAuthScreen}  
                          options={{headerShown: false}}
                          />

                        <Main.Screen name="Home" component={MenuStackSecond} 
                        options={{
                          headerTitle: () => <CustomHeader headerTitle={ctx.title}/>,
                          headerLeft:null,
                          headerStyle: {
                            backgroundColor: '#F15946',
                          },
                        }}/>

                        <Main.Screen name="Auth" component={AuthStack}  options={{
                          headerShown: false, 
                        }}/>
                    </Main.Navigator>
                </ContextProvider>
              </NavigationContainer>
      )}
      </HomeTitleContext.Consumer>
  </HomeTitleContext.Provider>
    
  );
}