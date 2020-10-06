import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Badge, Text } from 'react-native-elements'

import userImageHolder from '../../assets/aiesecer.png'
const SugarCube = ({openModal, user, loggedEmail}) => {


    let letterColor = 'red';
    if(user) {
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
            default:
                break;
        }
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
    let imageObj;
    if(user) {
        if(user.imageUrl != '' && user.imageUrl != undefined) {
            imageObj = <Image source={{uri: user.imageUrl}} style={styles.image}/>
        } else {
            imageObj = <Image source={userImageHolder} style={styles.image}/>
        }
    }
    

    return <View style={styles.container}>
        
        <TouchableOpacity onPress={openModal} disabled={disabledSugar}>
        
            <View style={[styles.imageBorder, {borderColor: letterColor}]}>
                {imageObj}
            </View>
            <Text style={styles.lc}>{user.lc}</Text>
            <Text style={styles.ime}>{transformedName}</Text>
        </TouchableOpacity>

        {/*<View style={styles.textView}>
            <View style={styles.nameView}>{personlisedBadge}<Text style={styles.text}>  {session.name}</Text></View>
        </View>*/}
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        padding: 0,
        marginBottom: 50

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
        top: 100,
        color: '#000',
        fontSize: 12,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    lc: {
        position: 'absolute',
        fontSize: 10,
        left: 8,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontStyle: 'italic'
    },
    imageBorder: {
        borderWidth: 2,
        borderRadius: 50,
        width: 100,  
        height: 100,
        alignSelf: 'center',
        overflow: 'hidden',
        
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150,
        
    }
})
   
export default SugarCube;