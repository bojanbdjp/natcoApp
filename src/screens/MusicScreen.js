import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, FlatList, ScrollView} from 'react-native';
import { Text, Input, Button, Image} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import Construction from '../components/Construction';
import Spacer from '../components/Spacer'
import MusicRow from '../components/MusicRow'
import { Ionicons } from '@expo/vector-icons';
import { Context as MusicContext} from '../context/MusicContext'
import { Context as AuthContext} from '../context/AuthContext'
import { HomeTitleContext } from '../context/HeaderContext'

const MusicScreen = () => {
    const [song, setSong] = useState("");
    const {getSongs, state, addNewSong, addVote} = useContext(MusicContext);
    const {state: authstate} = useContext(AuthContext);
    const { setTitle } = useContext(HomeTitleContext);

    useEffect(() => {
        getSongs();
      }, []);

    useFocusEffect(() => {
        setTitle('Muzika');
    });

    const sortedSongs = state.songs.sort(function (a, b) {
        return b.voters.length - a.voters.length}) 

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.addSongContainer}>
                    <Input 
                        placeholder="Pesma" 
                        value={song}
                        onChangeText={setSong}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputStyle={styles.inputStype}
                        containerStyle={styles.inputContainer}
                        placeholderTextColor='#fff'
                    />
                    <Ionicons style={styles.addIcon} name="ios-add-circle-outline" size={34} color="black" 
                        onPress={() => addNewSong({name: song})}/>
                </View>

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
        
        
        
        
    }
});

export default MusicScreen;