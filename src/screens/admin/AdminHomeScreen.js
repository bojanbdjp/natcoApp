import React, { useState, useEffect, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import { Input, Button, Image, Text} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';

import apiurl from '../../api/server'
import ChooseTrack from '../../components/ChooseTrack';
import { HomeTitleContext } from '../../context/HeaderContext'
import { TouchableOpacity } from 'react-native-gesture-handler';


const AdminHomeScreen = () => {
    const [message, setMessage] = useState("");
    const [track, setTrack] = useState("123");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { setTitle } = useContext(HomeTitleContext);
    
    useFocusEffect(() => {
        setTitle('Admin');
    });


    sendNotification = async () => {
        setSuccessMessage("");
        if(message === "") {
            setError("Moraš dodati poruku!");
            return;
        }
        if(track === "123") {
            setError("Moraš izabrati za koga je obaveštenje!");
            return;
        }   
        setError("");
        try {
            const response = await apiurl.post('/sendNotification', {message, track});
            setSuccessMessage(response.data);
        } catch (err) {
            console.log("Ovo je greska ", err);
        }
    
    }



    return (
        <View style={styles.container}>

            <View style={styles.messageView}>
                <Text style={styles.heading}>Dodavanje nove poruke:</Text>
                <Input 
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder="Poruka" 
                    value={message}
                    onChangeText={setMessage}
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputStyle={styles.inputStype}
                    inputContainerStyle={{borderBottomWidth:0}}
                    placeholderTextColor='#0056d8'
                />
                <ChooseTrack isAllAvailable={true} chooseTrack={setTrack}/>

                {error != "" ? <Text style={styles.error}>{error}</Text> : null }

                <TouchableOpacity style={styles.submit}
                    onPress={() => sendNotification()}>
                    <Text style={styles.submitText}>Pošalji poruku</Text>
                </TouchableOpacity>


                {successMessage != "" ?<Text style={styles.success}>{successMessage}</Text> : null }
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginHorizontal: 10,
        paddingTop: 20
    },
    heading: {
        fontSize: 17,
        paddingLeft: 15,
        marginBottom: 10
    },
    messageView: {

    },

    inputStype:{
        borderWidth: 1,
        borderColor: '#0056d8',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        paddingLeft: 10,
        color: '#0056d8'
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
      error: {
          color: 'red',
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft: '5%',
          alignSelf: 'center'
      },
      success: {
        color: '#00af07',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 20,
        marginLeft: '5%',
        alignSelf: 'center'
      }
});

export default AdminHomeScreen;