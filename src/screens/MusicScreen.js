import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import { Text, Input, Button, Image} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import Construction from '../components/Construction';
import Spacer from '../components/Spacer'
import MusicRow from '../components/MusicRow'
import { Ionicons } from '@expo/vector-icons';
import { Context as MusicContext} from '../context/MusicContext'
import { Context as AuthContext} from '../context/AuthContext'
import { HomeTitleContext } from '../context/HeaderContext'

const MusicScreen = ({navigation}) => {
    const [song, setSong] = useState("");
    const {getSongs, state, addNewSong, addVote} = useContext(MusicContext);
    const {state: authstate} = useContext(AuthContext);
    const { setTitle } = useContext(HomeTitleContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSongs();
        });
        return unsubscribe; 
      }, []);

    useFocusEffect(() => {
        setTitle('Muzika');
    });

    let loader = null;

    

    if(state.loading) {
        loader = <ActivityIndicator size="large" color="#F15946" />     
    }

    if(state.errorMessage) {
        loader = <Text style={styles.errorMessage}>{state.errorMessage}</Text>
    }

     

    const sortedSongs = state.songs.sort(function (a, b) {
        return b.voters.length - a.voters.length}) 

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.addSongContainer}>
                    <Input 
                        placeholder="Unesi naziv pesme" 
                        value={song}
                        onChangeText={setSong}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputStyle={styles.inputStype}
                        containerStyle={styles.inputContainer}
                        placeholderTextColor='#0056d8'
                    />
                    <Ionicons style={styles.addIcon} name="ios-add-circle-outline" size={34} color="#0056d8" 
                        onPress={() => addNewSong({name: song})}/>
                </View>
                {loader}

                <View>
                    {sortedSongs.map(song => {
                        return <MusicRow key={song._id}
                                songName={song.name}
                                    voters={song.voters}
                                    votes={song.voters.length}
                                    vote={addVote}
                                    currentUser={authstate.email}/>
                    })}
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
        borderColor: '#0056d8',
        borderWidth: 1,
        backgroundColor: '#fff',
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
        width: '20%',
        paddingTop: 4,
        paddingLeft: 7,
    },
    errorMessage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        paddingBottom: 15,
        paddingLeft: 10,
    },
});

export default MusicScreen;