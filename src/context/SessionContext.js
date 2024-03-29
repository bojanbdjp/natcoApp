import createDataContext from './createDataContext';
import trackerApi from '../api/server';
import AsyncStorage from '@react-native-community/async-storage'
import {navigate} from '../../RootNavigation';

const sessionReducer = (state, action) => {
    switch (action.type) {
        case 'loading': 
            return {...state, loading: true}
        case 'get_sessions': 
            return {...state, sessions: action.payload.sessions, 
                loading:false, 
                errorMessage: ''}
        case 'rate_session':
            return {...state, rateAnswer: action.payload.rated ,loading: false}
        case 'add_error': 
            return {...state, errorMessage: action.payload, loading:false, sessions: []}
        case 'enable_button': 
            return {...state, rateAnswer: false}
        default:
            return state;
    }
};


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
        dispatch({type: 'add_error', payload: 'Došlo je do greške'})
    }
}

const rateSession = dispatch => async ({rateSession, comment, name}) => {
    dispatch({type: 'loading'})
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/rateSession', {name, email, rateSession, comment});
        dispatch({type: 'rate_session', payload: response.data})

        const resSessions = await trackerApi.post('/sessionsFilter', {day: 1, track: 'Common'}); 
        dispatch({type: 'get_sessions', payload: resSessions.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}


const rateDailySession = dispatch => async ({dailyFaci, dailyOc ,dailyChair,dailyGeneral, name}) => {
    dispatch({type: 'loading'})
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/rateDailySession', {name, email,
            faci: dailyFaci, oc: dailyOc , chair: dailyChair, general: dailyGeneral});
        dispatch({type: 'rate_session', payload: response.data})

        const resSessions = await trackerApi.post('/sessionsFilter', {day: 1, track: 'Common'}); 
        dispatch({type: 'get_sessions', payload: resSessions.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const enableButton = dispatch => async () => {
    dispatch({type: 'enable_button'})
}


export const {Provider, Context} = createDataContext(
    sessionReducer,
    {getSessions, filterSessions, rateSession, enableButton, rateDailySession},
    {sessions: [], errorMessage: '', loading: false, rateAnswer: false }
)