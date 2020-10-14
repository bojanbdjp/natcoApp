import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import { Text, Input, Button, Image} from "react-native-elements";
import { useFocusEffect} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { Context as SugarContext} from '../context/SugarCubesContext'
import { HomeTitleContext } from '../context/HeaderContext'
import SugarCube from '../components/SugarCube'

import AddSugarModal from '../components/AddSugarModal'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const SugarCubeScreen = () => {
    const [emailUser, setEmailUser] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [userObj, setUserObj] = useState();
    const [loggedUser, setLoggedUser] = useState();

    const { setTitle } = useContext(HomeTitleContext);
    const {state, searchDelegates, addNewSugarCube, enableButton} = useContext(SugarContext);

    useEffect(  () => {
        getLoggedEmail();
      }, []);

    const openModal = (user) => {
        setUserObj(user);
        setModalVisible(!modalVisible);
    }

    const getLoggedEmail = async () => {
        const email = await AsyncStorage.getItem('email');
        setLoggedUser(email);
    }

    useFocusEffect( () => {
        setTitle('Sugar Cubes');
        
    });

    let sortedDelegates = null;
    if(state.delegates) {
         sortedDelegates = state.delegates.users.sort(function (a, b) {
            if(a.email < b.email) { return -1; }
            if(a.email > b.email) { return 1; }
            return 0;
        })
        
        /*const filteredDelegates = sortedDelegates.filter(user => {
            return +user.track != 4;
        })*/

        sortedDelegates = sortedDelegates.map(user => <SugarCube key={user._id}
                                openModal={() => openModal(user)} loggedEmail={loggedUser}
                                user={user}/>)
    }

    let loader = null;
    
    if(state.loading) {
        loader = <ActivityIndicator size="large" color="#F15946" />  
      }

    return (
        <ScrollView>

        <AddSugarModal 
            user={userObj}
            modalVisible={modalVisible}
            closeModal={() => { setModalVisible(!modalVisible); searchDelegates("")}}
            addNewSugarCube={addNewSugarCube}
            loading={state.loading} 
            buttonDisabled={state.successMessage}
            enableButton={enableButton}
            triggerSearch={() => searchDelegates({name: 'aie'})}/>


            <View style={styles.container}>
                <View style={styles.addSongContainer}>
                    <Input 
                        placeholder="Pretraži po imenu i prezimenu" 
                        value={emailUser}
                        onChangeText={setEmailUser}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputStyle={styles.inputStype}
                        containerStyle={styles.inputContainer}
                        placeholderTextColor='#0056d8'
                    />
                    <TouchableOpacity onPress={() => searchDelegates({name: emailUser})}>
                        <FontAwesome name="search" size={30} color="#0056d8" style={styles.addIcon}/>
                    </TouchableOpacity>
                   
                </View>

                {loader}

                <View style={styles.users}>
                   {sortedDelegates}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    addSongContainer: {
        paddingTop: '5%',
        flexDirection: 'row',
        
    },
    inputStype:{
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#0056d8',
        borderWidth: 1,
        marginHorizontal: 0,
        paddingLeft: 10,
        color: '#0056d8',
        marginBottom: -5
    }, 
    inputContainer: {
        borderBottomWidth:0,
        width: '85%', 
        
    },
    addIcon: {
        paddingTop: 4,
        paddingLeft: 7,
    }, 
    users: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        justifyContent: 'space-around'
        
    }
});

export default SugarCubeScreen;