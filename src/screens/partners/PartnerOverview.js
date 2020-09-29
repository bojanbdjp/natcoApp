import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


import { HomeTitleContext } from '../../context/HeaderContext'

const PartnerOverview = ({modalVisible, modalImage, modalText, modalPartner, closeModal, partnerStyle}) => {
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
                <View style={[styles.modalContainer, {"borderColor": partnerStyle}]}>
                    <View>
                    <Image source={modalImage} style={styles.imageStyle}/>
                    </View>

                    <View style={[styles.partnerView, {"backgroundColor": partnerStyle}]}>
                        <Text style={styles.partnerText}>{modalPartner}</Text>
                    </View>

                    <View style={styles.descriptionView}>
                        <Text style={styles.description}>{modalText}</Text>
                    </View>

                    <TouchableOpacity onPress={closeModal} style={styles.close}>
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

   
export default PartnerOverview;