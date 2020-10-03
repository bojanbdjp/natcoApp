import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

const SugarCube = ({openModal, user, loggedEmail}) => {


    let letterColor;
    switch (user.track) {
        case '1':
            letterColor = 'blue'
            break;
        case '2':
            letterColor = 'green'
            break;
        case '3':
            letterColor = 'red'
            break;
        case 'SVI':
            personlisedBadge = <Badge value="SVI" status="warning" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>
            break;
        default:
            break;
    }

    let transformedName = null;
    if(user.email) {
        let splitName = user.email.split('@');
        splitName = splitName[0].split('.');
        if(splitName.length > 1) {
            transformedName = splitName[0] + " " + splitName[1];
        } else {
            transformedName = splitName[0];
        }
    }

    let disabledSugar = false;
    if(user.sugarCubes.length > 0) {

        user.sugarCubes.forEach(element => {
            if(element.email == loggedEmail) {
                disabledSugar = true;
            }
        });
    }
    

    return <View style={styles.container}>
        
        <TouchableOpacity onPress={openModal} disabled={disabledSugar}>
        
        </TouchableOpacity>
       <MaterialCommunityIcons  name={disabledSugar ? "email-check-outline" : "email-outline"}
            size={110} color={letterColor} style={styles.icon} />
        <Text style={styles.lc}>{user.lc}</Text>
        <Text style={styles.ime}>{transformedName}</Text>

        {/*<View style={styles.textView}>
            <View style={styles.nameView}>{personlisedBadge}<Text style={styles.text}>  {session.name}</Text></View>
        </View>*/}
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        padding: 0,
        

    },
    icon: {
        width: 120,
        textAlign:'center'
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ime: {
        position: 'absolute',
        top: 60,
        left: 26,
        width: 40,
        fontSize: 9,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    lc: {
        position: 'absolute',
        top: 30,
        left: 52,
        fontSize: 10,
        textTransform: 'capitalize',
        fontStyle: 'italic'
    }
})
   
export default SugarCube;