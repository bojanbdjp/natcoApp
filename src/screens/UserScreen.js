import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import { useFocusEffect, useBlurEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


import userImageHolder from '../../assets/user.png';
import { HomeTitleContext } from '../context/HeaderContext'
import {Context as AuthContext} from '../context/AuthContext'
import {IMGBB_API_KEY} from '../api/server'
import { ScrollView } from 'react-native-gesture-handler';

const UserScreen = ({navigation}) => {
    const {state, signout, addUserImage,
         getOneUser, deleteUserImage,
         clearSusscessMessage} = useContext(AuthContext);
    const { setTitle } = useContext(HomeTitleContext);
    const [image, setImage] = useState();
    const [displayChoosenImage, setDisplayChoosenImage] = useState('flex');


    useFocusEffect(() => {
        setTitle('Nalog');
    });


    useEffect(() => {
        getOneUser();
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();

      }, []);

      useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clearSusscessMessage();
            setDisplayChoosenImage('none');
          });
          return unsubscribe;
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setDisplayChoosenImage('flex');
        console.log("ovo je rezulat: ", result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };


    const uploadImage = async () => {
        let data = new FormData();

        data.append('filename', state.email);
        data.append('fileName', state.email);
        data.append('image', {
            uri: image,
            name: `${state.email}.jpg`,
            type: 'image/jpg'
        });

        try {
            let response = await fetch(`https://api.imgbb.com/1/upload?expiration=1209600&key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                  },
             });
            const body = await response.json();
            addUserImage({imageUrl: body.data.image.url});
            setDisplayChoosenImage('none');
        } catch(err) {
            console.log("Ovo je error", err);  

        }
    }

    let loader;
    let imageActions;
    let imageObj;
    let sugarCubes;
    if(state.errorMessage) {
      loader =  <Text style={styles.errorMessage}>{state.errorMessage}</Text>
    }

    if(state.successMessage) {
        loader =  <Text style={styles.successMessage}>{state.successMessage}</Text>
    }

    if(state.loading) {
      loader = <ActivityIndicator size="large" color="#F15946" />  
    }

    if(state.user) {
        if(state.user.imageUrl != '' && state.user.imageUrl != undefined) {
            imageActions = <TouchableOpacity onPress={deleteUserImage} ><Text style={styles.deleteImage}>Izbriši sliku</Text></TouchableOpacity>
            imageObj = <Image source={{uri: state.user.imageUrl}} style={styles.image}/>
        } else {
            imageActions = ( <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={pickImage} ><Text style={styles.pickImage}>Izaberi sliku</Text></TouchableOpacity> 
                {image && <TouchableOpacity onPress={uploadImage} ><Text style={styles.addImage}>Dodaj sliku</Text></TouchableOpacity> }
                </View>
            )
            imageObj = <Image source={userImageHolder} style={styles.image}/>
        }

        console.log("sigari: ", state.user.sugarCubes);
        if(state.user.sugarCubes.length > 0) {
            sugarCubes = state.user.sugarCubes.map(sug => {
                return <Text key={sug._id}>{sug.message}</Text>
            })
        }
    }




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

   

    return <ScrollView style={styles.container}>
        <View style={styles.imageView}>
                <View style={styles.imageBorder}>
                    {imageObj}
                </View>
               
                <AntDesign name="logout" size={24} color="black"
                style={styles.logout} onPress={signout}/>

            </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' , flexDirection: 'row'}}>
            {imageActions}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            {loader}
            {image &&  <Image source={{ uri: image }} style={{ width: 150, height: 150, display: displayChoosenImage }} />}
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


        <View style={styles.partition2}>
        <Text style={styles.partitionHeader}>Sugar cubes:</Text>
            {sugarCubes}
        </View>

        
    
    </ScrollView>
}

const styles = StyleSheet.create({
    imageView: {
        height: 250,
        backgroundColor: '#53B3CB',
        justifyContent: 'center'
    },
    imageBorder: {
        borderWidth: 2,
        borderColor: '#F15946',
        borderRadius: 100,
        width: 200,
        height: 200,
        alignSelf: 'center',
        overflow: 'hidden',
        
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        
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
    },
    pickImage: {
        borderColor: 'blue',
        borderWidth: 1,
        padding: 5,
        color: 'blue',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10
    },
    addImage: {
        borderColor: 'green',
        borderWidth: 1,
        padding: 5,
        color: 'green',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10
    },
    deleteImage: {
        borderColor: 'red',
        borderWidth: 1,
        padding: 5,
        color: 'red',
        fontWeight: 'bold',
        marginVertical: 10
    },
    errorMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10
    },
    successMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10
    }
});

export default UserScreen;