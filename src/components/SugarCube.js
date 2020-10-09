import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Badge, Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

import userImageHolder from '../../assets/aiesecer.png'
const SugarCube = ({openModal, user, loggedEmail}) => {

    const [loadingImage, setLoadingImage] = useState(true);

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
            case '4':
                letterColor = '#F9C22E'
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
    let doneIcon = null;
    if(user.sugarCubes.length > 0) {

        user.sugarCubes.forEach(element => {
            if(element.email == loggedEmail) {
                disabledSugar = true;
                doneIcon = <Ionicons name="ios-checkmark" size={28} color="green" style={{fontWeight: 'bold'}}/>
            }
        });
    }
    let imageObj;
    if(user) {



        if(user.imageUrl != '' && user.imageUrl != undefined) {
            imageObj = (
                        <View style={[styles.imageBorder, {borderColor: letterColor}]}>
                            <Image source={{uri: user.imageUrl}} style={styles.image}
                                        onLoadEnd={() =>  setLoadingImage(false)}/>

                                    <ActivityIndicator style={styles.loader}
                                    animating={loadingImage} size="large" color="#F15946"/>
                        </View>
                     )
        }  else {
            imageObj = <View style={[styles.imageBorder, {borderColor: letterColor}]}>
            <Image source={userImageHolder} style={styles.image}/></View>
        }
    }

    

    return <View style={styles.container}>
        
        <TouchableOpacity onPress={openModal} disabled={disabledSugar}>
        
            
                {imageObj}

            <View style={styles.done}>
                 {doneIcon}
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
    done: {
        position: 'absolute',
        left: 100
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
        
    }, loader:{
        position: 'absolute',
        top: '30%',
        left: '30%'
    }
})
   
export default SugarCube;