import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "react-native-elements";
import Input from '../components/Input'

import { HomeTitleContext } from '../context/HeaderContext'
import CustomPicker from '../components/UI/Picker'
import { ScrollView } from 'react-native-gesture-handler';

const EvaluationModal = ({modalVisible,  closeModal, enableButton, session,
     saveRate, buttonDisabled, loading, error, saveDaily}) => {
    const [rateSession, setRateSession] = useState();
    const [comment, setComment] = useState('');

    const [dailyFaci, setDailyFaci] = useState('');
    const [dailyOc, setDailyOc] = useState('');
    const [dailyChair, setDailyChair] = useState('');
    const [dailyGeneral, setDailyGeneral] = useState('');

    const closeModalLocal = () => {
        enableButton();
        closeModal();
    }

    let saveButton = <TouchableOpacity style={styles.submit} disabled={buttonDisabled}
                        onPress={() => saveRate({rateSession, comment, name: session.name})}>
                        <Text style={styles.submitText}>Oceni sešn</Text>
                    </TouchableOpacity>;


    let saveButtonDaily = <TouchableOpacity style={styles.submit} disabled={buttonDisabled}
                    onPress={() => saveDaily({dailyFaci, dailyOc,dailyChair,dailyGeneral,  name: session.name})}>
                    <Text style={styles.submitText}>Dodaj komentar</Text>
                </TouchableOpacity>;

    let errorMessage = null;
    if(error) {
        errorMessage = <Text style={styles.error}>{error}</Text>
    }               

    if(loading) {
        saveButton = <ActivityIndicator size="large" color="#F15946" />  
    }


    let modalContent = null;


    if(session.isDaily) {

        modalContent = (
            <ScrollView style={styles.modalContainer}>
                    <Text style={styles.sesName}>{session.name}</Text>

                    <Text style={styles.label}>Komentar za faci team:</Text>
                    <Input val={dailyFaci} setVal={setDailyFaci}
                        style={styles.inputStype}
                        constyle={{borderBottomWidth:0, padding: 0}}
                        placeholderTextColor='#0056d8'
                        isMultiline={true}
                    />

                    <Text style={styles.label}>Komentar za oc team:</Text>
                    <Input val={dailyOc} setVal={setDailyOc}
                        style={styles.inputStype}
                        constyle={{borderBottomWidth:0, padding: 0}}
                        placeholderTextColor='#0056d8'
                        isMultiline={true}
                    />

                    <Text style={styles.label}>Komentar za chair-a:</Text>
                    <Input val={dailyChair} setVal={setDailyChair}
                        style={styles.inputStype}
                        constyle={{borderBottomWidth:0, padding: 0}}
                        placeholderTextColor='#0056d8'
                    />

                    <Text style={styles.label}>Generalni komentar:</Text>
                    <Input val={dailyGeneral} setVal={setDailyGeneral}
                        style={styles.inputStype}
                        constyle={{borderBottomWidth:0, padding: 0}}
                        placeholderTextColor='#0056d8'
                    />

                    {saveButtonDaily}
                    {buttonDisabled ? <Text style={styles.success}>Uspešno si dodao komentar</Text> : null}
                    {errorMessage}
                    <TouchableOpacity onPress={() => closeModalLocal()} style={styles.close}>
                            <Text><AntDesign name="closecircleo" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </ScrollView>

        )

    } else {
        modalContent = (
            <ScrollView style={styles.modalContainer}>
                
                    <Text style={styles.sesName}>{session.name}</Text>
                    <Text style={styles.sesFaci}>{session.faci}</Text>

                    <Text style={styles.label}>Session:</Text>
                    <CustomPicker 
                        onChange={setRateSession}
                        label="Ocena"
                        items={[
                            { label: '1', value: '1', key: 'ocena1'},
                            { label: '2', value: '2', key: 'ocena2'},
                            { label: '3', value: '3', key: 'ocena3' },
                            { label: '4', value: '4', key: 'ocena4' },
                            { label: '5', value: '5', key: 'ocena5' },
                    ]}/> 

                    <Text style={styles.label}>Komentar:</Text>
                    <Input val={comment} setVal={setComment}
                        style={styles.inputStype}
                        constyle={{borderBottomWidth:0, padding: 0}}
                        placeholderTextColor='#0056d8'
                    />

                    {saveButton}
                    {buttonDisabled ? <Text style={styles.success}>Uspešno si ocenio sešn</Text> : null}
                    {errorMessage}
                    <TouchableOpacity onPress={() => closeModalLocal()} style={styles.close}>
                            <Text><AntDesign name="closecircleo" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </ScrollView>
        )
    }

    return <View style={styles.container}>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}>
                
            {modalContent}

            </Modal>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        resizeMode: 'contain',
        width:  200,
        height: 200,
        
    }, 
    submit: {
        backgroundColor:'#0056d8',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
      }, 
      submitText:{
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff'
      },
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
        backgroundColor: "#F15946",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        marginBottom: 50
    },
    sesName: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    sesFaci: {
        fontSize: 12,
        fontStyle: 'italic',
        alignSelf: 'center',
        marginTop: 5
    },
    label: {
        marginTop: 20
    },
    inputStype:{
        flex: 1,
        borderWidth: 1,
        borderColor: '#0056d8',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        marginTop: 10,
        paddingLeft: 10,
        color: '#0056d8',
        height: 100

      }, 
      success: {
        color: '#00af07',
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        marginLeft: '5%',
        alignSelf: 'center',

      },
      error: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center'
    },
})

   
export default EvaluationModal;