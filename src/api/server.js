import axios from 'axios';

export default axios.create({
      // baseURL: 'http://8a13e77176d6.ngrok.io'
     baseURL: 'https://natco-app.herokuapp.com'
})

  // export const URL = 'http://8a13e77176d6.ngrok.io';
 export const URL = 'https://natco-app.herokuapp.com';


export const IMGBB_API_KEY = 'a3a9f45cf424d862d32867dc1e9fae32';