import axios from 'axios';
import { APIBASE } from '../../config/config.json';

const defaultApi = axios.create({
    baseURL : APIBASE,
});

export default defaultApi;