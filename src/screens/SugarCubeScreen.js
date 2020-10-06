import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, FlatList, ScrollView} from 'react-native';
import { Text, Input, Button, Image} from "react-native-elements";
import { useFocusEffect} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Construction from '../components/Construction';
import Spacer from '../components/Spacer'
import MusicRow from '../components/MusicRow'
import { Ionicons } from '@expo/vector-icons';
import { Context as SugarContext} from '../context/SugarCubesContext'
import { Context as AuthContext} from '../context/AuthContext'
import { HomeTitleContext } from '../context/HeaderContext'
import SugarCube from '../components/SugarCube'

import AddSugarModal from '../components/AddSugarModal'
import { TouchableOpacity } from 'react-native-gesture-handler';

const MusicScreen = () => {
    const [emailUser, setEmailUser] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [userObj, setUserObj] = useState("");

    const { setTitle } = useContext(HomeTitleContext);
    const {state, searchDelegates, addNewSugarCube} = useContext(SugarContext);

    useEffect(() => {
      }, []);

    const openModal = (user) => {
        setUserObj(user);
        setModalVisible(!modalVisible);
    }

    useFocusEffect(() => {
        setTitle('Sugar Cubes');
    });

    console.log("ajde da te vuid: ", state.delegates);
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
                                user={user}/>
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
            enableButton={{}}/>


            <View style={styles.container}>
                <View style={styles.addSongContainer}>
                    <Input 
                        placeholder="Ime i prezime" 
                        value={emailUser}
                        onChangeText={setEmailUser}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputStyle={styles.inputStype}
                        containerStyle={styles.inputContainer}
                        placeholderTextColor='#fff'
                    />
                    <TouchableOpacity onPress={() => searchDelegates({name: emailUser})}>
                        <FontAwesome name="search" size={30} color="black" style={styles.addIcon}/>
                    </TouchableOpacity>
                   
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

export default MusicScreen;