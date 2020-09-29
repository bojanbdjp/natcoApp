import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'


const SigninScreen = ({navigation}) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    useEffect(() => {
        navigation.addListener('focus', () => {
            clearErrorMessage();
        })
    }, []) 

    return  (
        <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>
            <AuthForm 
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Prijavi se"
                onSubmit={signin}
                isSignup={false}
            />
            <NavLink
                stackName='Auth'
                pageName='Signup'
                text="Nemaš nalog? Klikni ovde da ga napraviš"
            />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}

SigninScreen.navigationOptions = {
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

export default SigninScreen;