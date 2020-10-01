import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Button} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select';

import EvaluationModal from '../components/EvaluationModal'
import SessionRow from '../components/SessionRow'
import { HomeTitleContext } from '../context/HeaderContext'
import { Context as SessionContext} from '../context/SessionContext'


const EvaluationScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState();
    const [track, setTrack] = useState();
    const { setTitle } = useContext(HomeTitleContext);
    const { filterSessions, rateSession, enableButton, state } = useContext(SessionContext);

    const [sessionObject, setSessionObject] = useState("");
   

    useFocusEffect(() => {
        setTitle('Evaluacije');
    });

    useEffect(() => {
        console.log("Sessions" , state.sessions);
    }, [state.sessions]);

    const openModal = (ses) => {
        console.log("ovo je ses ", ses);
        setSessionObject(ses);
        setModalVisible(!modalVisible);
    }


      let sessions = null

      if(state.sessions != null) {
        sessions = state.sessions.map(ses => <SessionRow session={ses}
                                                        key={ses.name} 
                                                        openModal={() => openModal(ses)}/>)
      }

      if(state.loading) {
        sessions = <ActivityIndicator size="large" color="#F15946" />  
      }

    return <ScrollView style={styles.scrollcontainer}>

    <EvaluationModal 
        session={sessionObject}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(!modalVisible)}
        saveRate={rateSession}
        buttonDisabled={state.rateAnswer}
        loading={state.loading}
        enableButton={enableButton}/>

    <View style={styles.container}>
        
        <View>  
        <RNPickerSelect useNativeAndroidPickerStyle={true}
            onValueChange={setDay}
            placeholder={{
                label: 'Izaberite dan',
                value: null,
            }}   style={{ ...pickerSelectStyles }}
            items={[
                { label: 'Dan 1', value: '1', key: 'dan1'},
                { label: 'Dan 2', value: '2', key: 'dan2'},
                { label: 'Dan 3', value: '3', key: 'dan3' },
                { label: 'Dan 4', value: '4', key: 'dan4' },
                { label: 'Dan 5', value: '5', key: 'dan5' },
        ]}/> 

        <RNPickerSelect useNativeAndroidPickerStyle={true}
            onValueChange={setTrack}
            placeholder={{
                label: 'Izaberite track',
                value: null,
            }} style={{ ...pickerSelectStyles }}
            items={[
                { label: 'TM', value: 'TM', key: 'TM'},
                { label: 'TL', value: 'TL', key: 'TL'},
                { label: 'EB', value: 'EB', key: 'EB' },
                { label: 'Common', value: 'Common', key: 'Common' },
        ]}/> 

            <Button buttonStyle={styles.submit}
                title="Pretraži"
                onPress={() => {filterSessions({day, track})}}
            /> 
        </View>

        {state.errorMessage != "" ? <Text style={styles.error}>{state.errorMessage}</Text> : null }

        {sessions}

    </View>
    
    </ScrollView>
}

const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#fff', 
        paddingHorizontal: 10,
        paddingTop: 20,

    },
    submit: {
        backgroundColor:'#E01A4F',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10
      }, 
      error: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 10
    },
});

export default EvaluationScreen;