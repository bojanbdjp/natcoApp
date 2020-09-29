import React from 'react';
import {View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const CustomHeader = ( {headerTitle}) => {
    const navigation = useNavigation();

    return <View style={styles.container}>
        <Feather name="menu" size={24} color="black" 
            onPress={ () => {
                navigation.dispatch(DrawerActions.toggleDrawer());
            }}/>

        <Text style={styles.title}>{headerTitle}</Text>

        <SimpleLineIcons name="user" size={24} color="black"
            onPress={ () => {
            navigation.navigate('User');
        }} style={styles.user}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        alignSelf: 'center'
        
    },
    title: {
        fontSize: 18,  
    },
    user: {
        
    }
})
   
export default CustomHeader;