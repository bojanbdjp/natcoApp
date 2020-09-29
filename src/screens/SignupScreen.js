import React, { useContext, useEffect } from 'react';
import {StyleSheet,View,KeyboardAvoidingView, ScrollView} from "react-native";
import { Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);
    
    useEffect(() => {
        navigation.addListener('focus', () => {
            clearErrorMessage();
        })
    }, []) 

    return (
        <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
               
                <AuthForm 
                    headerText="Sign Up for Tracker"
                    errorMessage={state.errorMessage}
                    submitButtonText="Napravi nalog"
                    onSubmit={signup}
                    isSignup={true}
                />
                <NavLink
                    stackName='Auth'
                    pageName='Signin'
                    text="Već imaš nalog? Klikni ovde da se prijaviš"
                />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

SignupScreen.navigationOptions = {
  headerShown: false,
};

 
const styles = StyleSheet.create({
    contentContainerStyle: {
        backgroundColor: '#F9C22E',
        paddingVertical: 20,
        height: '100%',
        paddingHorizontal: 5
      }
});

export default SignupScreen;