import axios from 'axios';

export default axios.create({
    // baseURL: 'https://natco-app.herokuapp.com'
    baseURL: 'http://2e20aebedcba.ngrok.io'
})

// export const URL = 'https://natco-app.herokuapp.com';
export const URL = 'http://2e20aebedcba.ngrok.io';


export const IMGBB_API_KEY = 'a3a9f45cf424d862d32867dc1e9fae32';