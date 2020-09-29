import React, { useState, useEffect, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import { Input, Button, Image, Text} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';

import apiurl from '../../api/server'
import ChooseTrack from '../../components/ChooseTrack';
import { HomeTitleContext } from '../../context/HeaderContext'


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
            console.log("ovo je odogovor", JSON.stringify(response.data));
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
                    placeholderTextColor='#E01A4F'
                />
                <ChooseTrack isAllAvailable={true} chooseTrack={setTrack}/>

                {error != "" ? <Text style={styles.error}>{error}</Text> : null }

                <Button buttonStyle={styles.submit}
                    title="Pošalji poruku"
                    onPress={() => sendNotification()}
                />

                {successMessage != "" ?<Text style={styles.success}>{successMessage}</Text> : null }
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginHorizontal: 10,
        backgroundColor: '#fff',
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
        borderColor: '#E01A4F',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        paddingLeft: 10,
        color: '#E01A4F'
      }, 
      submit: {
        backgroundColor:'#E01A4F',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10
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