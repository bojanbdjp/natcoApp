import createDataContext from './createDataContext';
import trackerApi from '../api/server';
import AsyncStorage from '@react-native-community/async-storage'
import {navigate} from '../../RootNavigation';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading': 
            return {...state, loading: true}
        case 'find_delegates': 
            return {...state, delegates: action.payload, loading: false}
        
        case 'add_new_sugar': 
            return {...state, errorMessage: ''}
        case 'add_error': 
        return {errorMessage: '' }
        default:
            return state;
    }
};



const clearErrorMessage = dispatch => () => {
    dispatch({type:'clear_error_message' });
}

const searchDelegates = (dispatch) => async ({name}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/filterDelegates', {name});
        dispatch({type: 'find_delegates', payload: response.data})   
    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
}



const addNewSugarCube = dispatch => async ({email, message, userEmail}) => {
    dispatch({type: 'loading'})
    try {
        const response = await trackerApi.post('/addNewSugarCube', {email, message, userEmail});
        dispatch({type: 'add_new_sugar', payload: response.data})   
    } catch (err) {
        dispatch({type: 'add_error', payload: err.response.data.message})
    }
    

}


export const {Provider, Context} = createDataContext(
    authReducer,
    {searchDelegates, addNewSugarCube, clearErrorMessage},
    {delegates: '', errorMessage: '', loading: false}
)