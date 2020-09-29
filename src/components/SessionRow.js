import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

const SessionRow = ({session, openModal}) => {
    const[email, setEmail] = useState();

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
    const testFunction = async () => {
        let emaill =  await AsyncStorage.getItem('email');
        setEmail(emaill);
    }

    useEffect(() => {
        testFunction()
    }, [])
    

    let icon = null;
    let delegates = session.delegates.filter(del => {

        return del.email == email;
    })
    if(delegates.length > 0) {
        icon = <MaterialIcons name="done" size={24}  color="green" />
    } else {
        icon = <TouchableOpacity onPress={openModal}>
                    <FontAwesome name="pencil" size={24} color="#F15946"/>
                </TouchableOpacity>
    }
    

    return <View style={styles.container}>
        
        <View style={styles.textView}>
            <View style={styles.nameView}>{personlisedBadge}<Text style={styles.text}>  {session.name}</Text></View>
            <Text style={styles.text2}><FontAwesome5 name="user-alt" size={10} color="black"/>  {session.faci}</Text>
        </View>
        {icon}
        
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
    }
})
   
export default SessionRow;