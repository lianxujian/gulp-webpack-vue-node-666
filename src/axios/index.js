/**
 * Created by juntingliu2 on 2017/4/5.
 */
import Vue from 'vue'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
let isDevFlag = process.env.NODE_ENV === 'development'
export default
isDevFlag ?
    {
        showArtList: '/showArtList',
        showArt: '/showArt',
        createArt: '/createArt',
        updateHeader: '/updateHeader',
        submitForm: '/submitForm'
    }
    : {
        showArtList: '/showArtList',
        showArt: '/showArt',
        createArt: '/createArt',
        updateHeader: '/updateHeader',
        submitForm: '/submitForm'
    }