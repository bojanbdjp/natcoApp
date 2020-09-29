import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import {Badge, Text } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';

const Spacer = ({type, text}) => {

    let personlisedBadge = personlisedBadge = <Badge value="SVI" status="warning" containerStyle={{padding: 5}} badgeStyle={{padding: 2}}/>

    switch (type) {
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


    return <View style={styles.container}>
        {personlisedBadge}
        <View style={styles.textView}>
            <Text>{text}</Text>
        </View>
        <AntDesign name="closecircleo" size={24} color="black" 
        style={styles.closeIcon}/>
        
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
    closeIcon: {
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right',
        paddingRight: 5
    }, 
    textView: {
        flex: 6,
        flexDirection: 'row',
    }, 
    badge: {
       paddingLeft: 5
    }
})
   
export default Spacer;