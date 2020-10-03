import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'


const SessionRow = ({session, openModal}) => {

    let personlisedBadge;
    switch (session.track) {
        case 'TM':
            personlisedBadge = <Badge value="TM" status="success" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>
            break;
        case 'TL':
            personlisedBadge = <Badge value="TL" status="primary" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>
            break;
        case 'EB':
            personlisedBadge = <Badge value="EB" status="error" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>
            break;
        case 'SVI':
            personlisedBadge = <Badge value="SVI" status="warning" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>
            break;
        default:
            break;
    }

    const delegatesNumber = session.delegates.length;

    return <View style={styles.container}>
        
        <View style={styles.textView}>
            <View style={styles.nameView}>{personlisedBadge}<Text style={styles.text}>  {session.name}</Text></View>
            <Text style={styles.text2}><FontAwesome5 name="user-alt" size={10} color="black"/>  {session.faci}</Text>
        </View>

        <TouchableOpacity onPress={openModal} style={styles.delegatesNum}
         disabled={delegatesNumber > 0 ? false : true}>
            <Text>{delegatesNumber} </Text>
            <FontAwesome5 name="user-friends" size={14} color={delegatesNumber > 0 ? '#E01A4F' : 'black'} />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#cecece',
        borderBottomWidth: 1,
        paddingVertical: 2,
        marginHorizontal: 5,

    },
    icon: {
        borderWidth: 2,
        borderColor: 'red',
        paddingTop: 4
    },
   
    textView: {
        flex: 7,
        flexDirection: 'column',
        overflow: 'hidden'
    }, 
    badge: {
       paddingLeft: 5
    },
    text: {
        marginRight: 10,
        fontSize: 16,
        fontWeight:'bold'
    },
    text2: {
        marginLeft: 10,
        fontSize: 12,
        fontStyle: 'italic'
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    delegatesNum: {
        flexDirection: 'row'
    }
})
   
export default SessionRow;