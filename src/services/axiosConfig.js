import axios from 'axios';

export const commonRequest = async (method, url, body, header) => {
    let reqConfig = {
        method,
        url,
        data: body,
        headers: header ? header : { "Content-Type": "application/json" }
    };

    try {
        const response = await axios(reqConfig);
        return response.data;
    } catch (error) {
        return error.response || error;
    }
};
