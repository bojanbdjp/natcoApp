import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import { useFocusEffect, useBlurEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


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
        //
        (async () => {  
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();


        const unsubscribe = navigation.addListener('focus', () => {
            getOneUser();
        });
        return unsubscribe; 
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
            addUserImage({imageUrl: body.data.image.url, imagesAdded: state.user.imagesAdded});
            setDisplayChoosenImage('none');
        } catch(err) {
            console.log("Ovo je error", err);  

        }
    }

    let loader;
    let imageActions;
    let imageObj;
    let sugarCubes;
    let lcName = null;
    let track = null;
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
        if (state.user.imagesAdded > 2) {
            imageActions = <Text>Iskoristio/la si 3 prava da promeniš sliku!</Text>
            imageObj = <Image source={{uri: state.user.imageUrl}} style={styles.image}/>
        } else {
        
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
    }



        if(state.user.sugarCubes.length > 0) {
            sugarCubes = state.user.sugarCubes.map(sug => {
                return <Text key={sug._id}>-{sug.message}</Text>
            })
        }
    
        
        switch (state.user.track) {
            case '0':
                track = 'TM track'
                break;
            case '1':
                track = 'TL track'
                break;
            case '2':
                track = 'EB track'
                break;
            case '4':
                track = 'Administrator'
                break;
            default:
                track = 'Nepoznato'
        }

        
        switch (state.user.lc) {
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

}

    return <ScrollView style={styles.container}>
        <View style={styles.imageView}>
                <View style={styles.imageBorder}>
                    {imageObj}
                </View>
                
                <AntDesign name="logout" size={26} color="#0056d8"
                style={styles.logout} onPress={signout}/>

        </View>
        <View style={styles.borderBottom}><View style={styles.borderBottomInner}></View></View>   

        <View style={{paddingTop: 10, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#F9C22E', flexDirection: 'row'}}>
            {imageActions}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9C22E', paddingBottom: 10}}>
            {loader}
            {image &&  <Image source={{ uri: image }} style={{ width: 150, height: 150, display: displayChoosenImage }} />}
        </View>

        
        <View style={styles.partition}>
            <Text style={styles.basicInfo}>{state.email} </Text>
            <Text style={styles.basicInfo}>{lcName}</Text>
            <Text style={styles.basicInfo}>{track}</Text>
        </View>


        <View style={styles.borderBottom}><View style={styles.borderBottomInner}></View></View>

        <View style={styles.partition3}>
            <Text style={styles.partitionHeader}>Sugar cubes:</Text>
                {sugarCubes}
        </View>

        
    
    </ScrollView>
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: '#F9C22E',
    },
    imageView: {
        height: 250,
        backgroundColor: '#F9C22E',
        justifyContent: 'center'
    },
    imageBorder: {
        borderWidth: 2,
        borderColor: 'black',
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
        backgroundColor: '#F9C22E',
        paddingBottom: 10
    },
    partition2: {
        backgroundColor: '#F9C22E',
        paddingLeft: 20,
        paddingVertical: 5,
    },
    partition3: {
        backgroundColor: '#F9C22E',
        paddingLeft: 20,
        paddingBottom: 50,
        paddingTop: 5
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
        borderColor: '#0056d8',
        borderWidth: 1,
        padding: 5,
        color: '#0056d8',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10,
        fontSize: 18
    },
    addImage: {
        borderColor: 'green',
        borderWidth: 1,
        padding: 5,
        color: 'green',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10,
        fontSize: 18
    },
    deleteImage: {
        borderColor: 'red',
        borderWidth: 1,
        padding: 5,
        color: 'red',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 18
    },
    errorMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        paddingBottom: 10
    },
    successMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        paddingBottom: 10
    },
    borderBottom:{
        backgroundColor: '#F9C22E',
    },
    borderBottomInner:{
        height: 1,
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
    }
});

export default UserScreen;