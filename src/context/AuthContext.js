import createDataContext from './createDataContext';
import trackerApi from '../api/server';
import AsyncStorage from '@react-native-community/async-storage'
import {navigate} from '../../RootNavigation';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading': 
            return {...state, loading: true}
        case 'add_error': 
            return {...state, errorMessage: action.payload, loading: false}
        case 'signin': 
            return {errorMessage: '', 
            token: action.payload.token, 
            email: action.payload.email,
            track: action.payload.track,
            lc: action.payload.lc,
            loading: false}
        case 'clear_error_message': 
            return {...state, errorMessage: ''}
        case 'signout': 
        return {errorMessage: '' , token: null, email: '', track: ''}
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');

    if (token && email) {
        try {
            const response = await trackerApi.post('/getUser', {email});
            const signInData = {
                email: response.data.emailFromDB,
                track: response.data.track,
                lc: response.data.lc,
                token: token
            }
            dispatch({type: 'signin', payload: signInData})
        } catch (err) {
            console.log("Ovo je greska ", err);
        }
        console.log("Ispred prve navigacije");
        navigate('Home', {screen: 'Home'}); 
    } else {
        console.log("Ispred druge navigacije");
        navigate('Auth');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type:'clear_error_message' });
}

const signup = (dispatch) => async ({email, password, track, lc}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/signup', {email, password, track, lc});
        console.log("ovo je bas respose ", response.data);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('email', response.data.email);
        
        dispatch({type: 'signin', payload: response.data})

        navigate('Home', {screen: 'Home'});
    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const signin = (dispatch) => async ({email, password, track, lc}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('email', response.data.email);
        dispatch({type: 'signin', payload: response.data})
        console.log("idemo na sign in");
        navigate('Home', {screen: 'Home'})
    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    navigate('Auth');
    dispatch({type: 'signout'})
    

}


export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signup, signout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: '', track: '', lc: '' , email: '', loading: false}
)