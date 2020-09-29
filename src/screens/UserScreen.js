import React, {useContext} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import user from '../../assets/user.png';
import { HomeTitleContext } from '../context/HeaderContext'
import {Context as AuthContext} from '../context/AuthContext'
import singi from '../../assets/singiLogo.png'

const UserScreen = () => {
    const {state, signout} = useContext(AuthContext);
    const { setTitle } = useContext(HomeTitleContext);

    useFocusEffect(() => {
        setTitle('Nalog');
    });


    let track = null;
    switch (state.track) {
        case '1':
            track = 'TM track'
            break;
        case '2':
            track = 'TL track'
            break;
        case '3':
            track = 'EB track'
            break;
        case '4':
            track = 'Administrator'
            break;
        default:
            track = 'Nepoznato'
    }

    let lcName = null;
    switch (state.lc) {
        case 'sin':
            lcName = 'LC Singidunum'; break;
        case 'eko':
            lcName = 'LC EF'; break;
        case 'fon':
            lcName = 'LC FON'; break;
        case 'nis':
            lcName = 'LC Nis'; break;
        case 'kag':
            lcName = 'LC KG'; break;
        case 'met':
            lcName = 'LC MET'; break;
        case 'nsa':
            lcName = 'LC NS'; break;
        case 'sub':
            lcName = 'LC Subotica'; break;
        default:
            track = 'Nepoznato'
    }

    return <View style={styles.container}>
        <View style={styles.imageView}>
            <ImageBackground source={singi} style={styles.lcLogo}>
                <Image source={user} style={styles.image}/>
                <AntDesign name="logout" size={24} color="black"
                style={styles.logout} onPress={signout}/>
            </ImageBackground>
            </View>
        
        <View style={styles.partition}>
            <Text style={styles.basicInfo}>{state.email} </Text>
            <Text style={styles.basicInfo}>{lcName}</Text>
            <Text style={styles.basicInfo}>{track}</Text>
        </View>

        <View style={styles.partition2}>
            <Text style={styles.partitionHeader}>Evaluacije:</Text>
            <Text style={styles.evaluationText}>Dan 1: 50%</Text>
            <Text style={styles.evaluationText}>Dan 2: 20%</Text>
            <Text style={styles.evaluationText}>Dan 3: 0%</Text>
            <Text style={styles.evaluationText}>Dan 4: 0%</Text>
            <Text style={styles.evaluationText}>Dan 5: 0%</Text>
        </View>

        
    
    </View>
}

const styles = StyleSheet.create({
    imageView: {
        height: 200,
        backgroundColor: '#53B3CB',
    },
    image: {
        flex: 1,
        aspectRatio: 0.7, 
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    lcLogo: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: "center",
    },
    partition: {
        alignItems: 'center',
        backgroundColor: '#f5e9dc',
        marginBottom: 10
    },
    partition2: {
        backgroundColor: '#f5e9dc',
        marginBottom: 10,
        paddingLeft: 10,
    },
    basicInfo: {
        fontSize: 20,
        paddingVertical: 3,
    },
    partitionHeader: {
        fontSize: 20,
        paddingVertical: 3,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    evaluationText: {
        fontSize: 15
    },
    logout: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: '80%',
        paddingRight: 15,
        fontWeight: 'bold',
    }
});

export default UserScreen;