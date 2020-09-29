import createDataContext from './createDataContext';
import trackerApi from '../api/server';
import AsyncStorage from '@react-native-community/async-storage'
import {navigate} from '../../RootNavigation';

const sessionReducer = (state, action) => {
    switch (action.type) {
        case 'loading': 
            return {...state, loading: true}
        case 'get_sessions': 
            return {...state, sessions: action.payload.sessions, loading:false, errorMessage: ''}
        case 'add_vote':
            return {...state, songs: state.songs.map(song => {
                if(song.name === action.payload.song.name){
                    song.voters = action.payload.song.voters
                } 
                return song;
            }), loading:false}
        case 'add_song':
            return {...state, songs: state.songs.concat(action.payload), loading:false}
        case 'add_error': 
            return {...state, errorMessage: action.payload, loading:false, sessions: []}
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
    try {
        const response = await trackerApi.post('/newSong', {name});
        dispatch({type: 'add_song', payload: response.data})
        

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong we cant sign up'})
    }
}

const filterSessions = dispatch => async ({day, track}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/sessionsFilter', {day: day, track: track});
        dispatch({type: 'get_sessions', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
  
    
}

const getSessions = dispatch => async () => {
    try {
        const response = await trackerApi.get('/sessions');
        dispatch({type: 'get_sessions', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong we cant sessions'})
    }
}


export const {Provider, Context} = createDataContext(
    sessionReducer,
    {getSessions, filterSessions},
    {sessions: [], errorMessage: '', loading: false }
)