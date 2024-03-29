import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import { Rating, AirbnbRating } from 'react-native-ratings';

import { HomeTitleContext } from '../context/HeaderContext'
import CustomPicker from './UI/Picker'
import { ScrollView } from 'react-native-gesture-handler';

const EvaluationAdminModal = ({modalVisible,  closeModal, enableButton, session, saveRate, buttonDisabled, loading}) => {


    const closeModalLocal = () => {
        enableButton();
        closeModal();
    }

    let sessionsArray = null;
    let brojDelegata = 0;
    let ukupnaOcena = 0;
    let prosecnaOcena = 0;
    let basicSessionView = null;
    
    if(session) {
        if(session.isDaily && session.dailyComment.length > 0) {

            session.dailyComment.sort(function (a, b) {
                if(a.lc < b.lc) { return -1; }
                if(a.lc > b.lc) { return 1; }
                return 0;
            });

            session.dailyComment.forEach(com => {
                brojDelegata++;
            });

            sessionsArray = session.dailyComment.map(del =>
                <View key={del._id} style={styles.borderBot}>
                    <Text style={styles.lcHead}>{del.lc}</Text>
                    <Text>Faci: {del.mark.faci}</Text>
                    <Text>OC: {del.mark.oc}</Text>
                    <Text>Chair: {del.mark.chair}</Text>
                    <Text>Generalni: {del.mark.general}</Text>
                </View>
            )

        } else if (session.delegates) {
        
            session.delegates.sort(function (a, b) {
                if(a.lc < b.lc) { return -1; }
                if(a.lc > b.lc) { return 1; }
                return 0;
            })
                
            sessionsArray = session.delegates.map(del => <Text key={del._id}>{del.lc} - {del.mark.comment}</Text>)

            session.delegates.forEach(com => {
                brojDelegata++;
                ukupnaOcena = ukupnaOcena + +com.mark.session;
            });

            prosecnaOcena = ukupnaOcena/brojDelegata;


            basicSessionView = (
                <View>
                    <Text style={styles.heading}> Prosečna ocena: {prosecnaOcena}</Text>

                    <Rating
                        startingValue={prosecnaOcena}
                        type='heart'
                        ratingCount={5}
                        imageSize={40}
                        isDisabled={true}
                        style={styles.stars}
                        />
                </View>
            )
        }
    }

   


    return <View style={styles.container}>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
               <ScrollView style={styles.modalContainer}>
                <Text style={styles.sesName}>{session.name}</Text>
                <Text style={styles.heading}> Broj evaluacija: {brojDelegata}</Text>
               
                {basicSessionView}
                {sessionsArray}

                <TouchableOpacity onPress={() => closeModalLocal()} style={styles.close}>
                        <Text><AntDesign name="closecircleo" size={24} color="black" /></Text>
                </TouchableOpacity>
               </ScrollView>
            </Modal>
    </View>
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 12,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 3,
        margin: 10,

    },

    close: {
        alignSelf: 'flex-end',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: "#F15946",
        borderRadius: 25,
        padding: 10,
        elevation: 2
    },
    label: {
        marginTop: 20
    },
    heading: {
        alignSelf: 'center',
        fontSize: 17,
    },
    stars: {
        marginVertical: 15
    },
    sesName: {
        fontWeight: 'bold',
        fontSize: 19,
        alignSelf: 'center',
        marginBottom: 10
    },
    lcHead: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'capitalize'
    },
    borderBot: {
        paddingBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }

})

   
export default EvaluationAdminModal;