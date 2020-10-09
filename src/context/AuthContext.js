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
            isAdmin: action.payload.isAdmin,
            loading: false}
        case 'clear_error_message': 
            return {...state, errorMessage: ''}
        case 'add_image': 
            return {...state, 
                errorMessage: '',
                successMessage: action.payload.successMessage,
                user: action.payload.user,
                loading: false}
        case 'clear_success_message': 
            return {...state, successMessage: ''}
        case 'signout': 
            return {errorMessage: '' , token: null, email: '', track: ''}
        case 'get_one_user': 
            return {...state, user: action.payload.user, loading: false}
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
                isAdmin: response.data.isAdmin,
                token: token
            }
            dispatch({type: 'signin', payload: signInData})
        } catch (err) {
            console.log("Ovo je greska ", err);
        }
        navigate('Home', {screen: 'Home'}); 
    } else {
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
        navigate('Home', {screen: 'Home'})
    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const addUserImage = (dispatch) => async ({imageUrl, imagesAdded}) => {
    dispatch({type: 'loading'})
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/addUserImage', {imageUrl, email, imagesAdded});
        dispatch({type: 'add_image', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const deleteUserImage = (dispatch) => async () => {
    dispatch({type: 'loading'})
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/deleteUserImage', {email});

        dispatch({type: 'add_image', payload: response.data})

    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}

const clearSusscessMessage = (dispatch) => async () => {
    dispatch({type: 'clear_success_message'})

}


const getOneUser = (dispatch) => async () => {
    dispatch({type: 'loading'})
    try {
        const email = await AsyncStorage.getItem('email');
        const response = await trackerApi.post('/getOneUser', {email});
        dispatch({type: 'get_one_user', payload: response.data})

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
    {signin, signup, signout, 
     clearErrorMessage, tryLocalSignin,
     addUserImage, getOneUser, deleteUserImage,
     clearSusscessMessage},
    {token: null, errorMessage: '', successMessage: '', track: '', lc: '', isAdmin: false, email: '', user: '', loading: false}
)