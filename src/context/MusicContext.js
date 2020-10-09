import createDataContext from './createDataContext';
import trackerApi from '../api/server';
import AsyncStorage from '@react-native-community/async-storage'
import {navigate} from '../../RootNavigation';

const musicReducer = (state, action) => {
    switch (action.type) {
        case 'get_songs': 
            return {...state, songs: action.payload.songs, loading: false}
        case 'loading': 
            return {...state, loading: true}
        case 'add_vote':
            return {...state, songs: state.songs.map(song => {
                if(song.name === action.payload.song.name){
                    song.voters = action.payload.song.voters
                } 
                return song;
            })}
        case 'add_song':
            return {...state, songs: state.songs.concat(action.payload), loading: false}
        case 'add_error': 
            return {...state, errorMessage: action.payload}
        default:
            return state;
    }
};


const addVote = dispatch => async ({name}) => {
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/addVote', {name, email});
        dispatch({type: 'add_vote', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong we cant sign up'})
    }
}


const addNewSong = dispatch => async ({name}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/newSong', {name});
        dispatch({type: 'add_song', payload: response.data})
        

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong we cant sign up'})
    }
}

const getSongs = dispatch => async () => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.get('/songs');
        dispatch({type: 'get_songs', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong we cant sign up'})
    }
}


export const {Provider, Context} = createDataContext(
    musicReducer,
    {getSongs, addNewSong, addVote},
    {songs: [], errorMessage: '', loading: false}
)