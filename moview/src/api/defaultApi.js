import axios from 'axios';

const defaultApi = axios.create({
    baseURL : 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/',
});

export default defaultApi;