import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import EvaluationModal from '../../components/EvaluationModal'
import EvaluationCommon from './EvaluationCommon'
import SessionRow from '../../components/SessionRow'
import { HomeTitleContext } from '../../context/HeaderContext'
import { Context as SessionContext} from '../../context/SessionContext'
import { Context as AuthContext} from '../../context/AuthContext'


const EvaluationScreenCommon = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState();
    const [track, setTrack] = useState();
    const { setTitle } = useContext(HomeTitleContext);
    const { filterSessions, rateSession, rateDailySession, enableButton, state } = useContext(SessionContext);
    const { state:authState, getOneUser} = useContext(AuthContext);

    const [sessionObject, setSessionObject] = useState("");
   

    useFocusEffect(() => {
        setTitle('Evaluacije');
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOneUser();
        });
        return unsubscribe; 

    }, []);

    const openModal = (ses) => {
        setSessionObject(ses);
        setModalVisible(!modalVisible);
    }


      let sessions = null

      if(state.sessions != null) {
        sessions = state.sessions.map(ses => <SessionRow session={ses} user={authState.user}
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
        enableButton={enableButton}
        error={state.errorMessage}
        saveDaily={rateDailySession}/>

    <View style={styles.container}>
        
        <EvaluationCommon filterSessions={filterSessions} />

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
      error: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center'
    },
});


export default EvaluationScreenCommon;