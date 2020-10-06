import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";

import { HomeTitleContext } from '../context/HeaderContext'
import CustomPicker from '../components/UI/Picker'

const EvaluationModal = ({modalVisible,  closeModal, enableButton, session, saveRate, buttonDisabled, loading}) => {
    const [rateSession, setRateSession] = useState();
    const [rateFaci, setRateFaci] = useState();
    const [comment, setComment] = useState();
    const { setTitle } = useContext(HomeTitleContext);

    useFocusEffect(() => {
        setTitle('Partneri');
    });

    const closeModalLocal = () => {
        enableButton();
        closeModal();
    }

    let saveButton = <TouchableOpacity style={styles.submit} disabled={buttonDisabled}
                        onPress={() => saveRate({rateSession, rateFaci, comment, name: session.name})}>
                        <Text style={styles.submitText}>Oceni sešn</Text>
                    </TouchableOpacity>;

                        

    if(loading) {
        saveButton = <ActivityIndicator size="large" color="#F15946" />  
    }

    return <View style={styles.container}>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.modalContainer}>
                
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

                <Text style={styles.label}>Faci:</Text>
                <CustomPicker 
                    onChange={setRateFaci }
                    label="Ocena"
                    items={[
                        { label: '1', value: '1', key: 'ocena1'},
                        { label: '2', value: '2', key: 'ocena2'},
                        { label: '3', value: '3', key: 'ocena3' },
                        { label: '4', value: '4', key: 'ocena4' },
                        { label: '5', value: '5', key: 'ocena5' },
                ]}/> 

                <Text style={styles.label}>Komentar:</Text>
                <Input 
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder="" 
                    value={comment}
                    onChangeText={setComment}
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputStyle={styles.inputStype}
                    inputContainerStyle={{borderBottomWidth:0, padding: 0}}
                    placeholderTextColor='#0056d8'
                />
                {saveButton}
                {buttonDisabled ? <Text style={styles.success}>Uspešno si ocenio sešn</Text> : null}
                <TouchableOpacity onPress={() => closeModalLocal()} style={styles.close}>
                        <Text><AntDesign name="closecircleo" size={24} color="black" /></Text>
                </TouchableOpacity>
                </View>
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
        elevation: 2
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

      }
})

   
export default EvaluationModal;