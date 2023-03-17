import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

const LangInterceptor = axios.create();

LangInterceptor.interceptors.request.use(function(config) {

    AsyncStorage.getItem(LocalStorageKeys.lang).then(lang => config.headers["Content-Encoding"] = lang).catch(err => config.headers["Content-Encoding"] = 'en')
    
    return config;
});

export default LangInterceptor;