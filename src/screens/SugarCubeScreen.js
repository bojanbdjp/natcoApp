import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, FlatList, ScrollView} from 'react-native';
import { Text, Input, Button, Image} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import Construction from '../components/Construction';
import Spacer from '../components/Spacer'
import MusicRow from '../components/MusicRow'
import { Ionicons } from '@expo/vector-icons';
import { Context as SugarContext} from '../context/SugarCubesContext'
import { Context as AuthContext} from '../context/AuthContext'
import { HomeTitleContext } from '../context/HeaderContext'
import SugarCube from '../components/SugarCube'

import AddSugarModal from '../components/AddSugarModal'

const MusicScreen = () => {
    const [emailUser, setEmailUser] = useState("");
    const [loggedUserEmail, setLoggedUserEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [userObj, setUserObj] = useState("");

    const { setTitle } = useContext(HomeTitleContext);
    const {state, searchDelegates, addNewSugarCube} = useContext(SugarContext);

    useEffect(() => {
        findLoggedUserEmail();
      }, []);

    const openModal = (user) => {
        setUserObj(user);
        setModalVisible(!modalVisible);
    }

    const findLoggedUserEmail = async () => {
        try {
            let emaill =  await AsyncStorage.getItem('email');
            setLoggedUserEmail(emaill);
        } catch(err) {
            console.log("doslo je do greske: ", err);
        }
        
       
    }  
    useFocusEffect(() => {
        setTitle('Sugar Cubes');
    });

    console.log("ajde da te vuid: ", state.delegates.users);
    let sortedDelegates = null;
    if(state.delegates) {
         sortedDelegates = state.delegates.users.sort(function (a, b) {
            if(a.email < b.email) { return -1; }
            if(a.email > b.email) { return 1; }
            return 0;
        })
        
        const filteredDelegates = sortedDelegates.filter(user => {
            return +user.track != 4;
        })

        sortedDelegates = filteredDelegates.map(user => {
            return <SugarCube key={user._id}
                                openModal={() => openModal(user)}
                                user={user}
                                loggedEmail={loggedUserEmail}/>
        })
    }

    return (
        <ScrollView>

        <AddSugarModal 
            user={userObj}
            modalVisible={modalVisible}
            closeModal={() => setModalVisible(!modalVisible)}
            addNewSugarCube={addNewSugarCube}
            buttonDisabled={state.rateAnswer}
            loading={state.loading}
            enableButton={enableButton}/>


            <View style={styles.container}>
                <View style={styles.addSongContainer}>
                    <Input 
                        placeholder="Ime i Prezime" 
                        value={emailUser}
                        onChangeText={setEmailUser}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputStyle={styles.inputStype}
                        containerStyle={styles.inputContainer}
                        placeholderTextColor='#fff'
                    />
                    <Ionicons style={styles.addIcon} name="ios-add-circle-outline" size={34} color="black" 
                        onPress={() => searchDelegates({name: emailUser})}/>
                </View>

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
        backgroundColor: '#53B3CB',
        marginHorizontal: 0,
        paddingLeft: 10,
        color: '#fff',
        marginBottom: -5
    }, 
    inputContainer: {
        borderBottomWidth:0,
        width: '85%', 
        
    },
    addIcon: {
        width: '20%',
        paddingTop: 4,
        paddingLeft: 7,
    }, 
    users: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    }
});

export default MusicScreen;