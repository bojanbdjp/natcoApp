import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";

const AddSugarModal = ({modalVisible,  closeModal, enableButton, userObj, addNewSugarCube, buttonDisabled, loading}) => {
    const [comment, setComment] = useState();


    const closeModalLocal = () => {
        enableButton();
        closeModal();
    }

    let saveButton = <Button buttonStyle={styles.submit}
                            title="Oceni sesn" disabled={buttonDisabled}
                            onPress={() => addNewSugarCube({rateSession, rateFaci, comment, name: session.name})}
                        />;

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
                
                <Text style={styles.sesName}>{userObj.name}</Text>

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
                    placeholderTextColor='#E01A4F'
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
        borderColor: '#E01A4F',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        marginTop: 10,
        paddingLeft: 10,
        color: '#E01A4F',
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

   
export default AddSugarModal;