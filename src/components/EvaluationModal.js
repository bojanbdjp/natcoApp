import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select';

import { HomeTitleContext } from '../context/HeaderContext'

const EvaluationModal = ({modalVisible,  closeModal, }) => {
    const [day, setDay] = useState();
    const { setTitle } = useContext(HomeTitleContext);

    useFocusEffect(() => {
        setTitle('Partneri');
    });

    return <View style={styles.container}>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.modalContainer}>
                    
                <RNPickerSelect useNativeAndroidPickerStyle={true}
                    onValueChange={setDay}
                    placeholder={{
                        label: 'Izaberite dan',
                        value: null,
                    }}   
                    items={[
                        { label: 'Dan 1', value: '1', key: 'dan1'},
                        { label: 'Dan 2', value: '2', key: 'dan2'},
                        { label: 'Dan 3', value: '3', key: 'dan3' },
                        { label: 'Dan 4', value: '4', key: 'dan4' },
                        { label: 'Dan 5', value: '5', key: 'dan5' },
                ]}/> 
                
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
    partnerText: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    }, 
    partnerView: {
        marginTop: 10,
        width: '90%',
        textAlign: 'center',
    },
    descriptionView: {
        marginTop: 20
    },
    modalContainer: {
        flex: 1,
        margin: 12,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
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
    description: {
        fontSize: 18,
        textAlign: 'center',
    },
    close: {
        alignSelf: 'flex-end',
        marginTop: 40,
        backgroundColor: "#F15946",
        borderRadius: 25,
        padding: 10,
        elevation: 2
    }
})

   
export default EvaluationModal;