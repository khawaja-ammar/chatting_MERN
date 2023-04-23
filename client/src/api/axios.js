import axios from 'axios';
import URL from './serverURL';

export default axios.create({
    baseURL: URL,
});
