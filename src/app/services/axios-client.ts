import axios from "axios";
import { AppLogLine } from "../models";

const baseURL = process.env.REACT_APP_API_URI;
const timeout = 15000;

const getHeaders = () => ({
  // Authorization: `Bearer ${getAccessToken()}`
});

let axiosClient = axios.create({ baseURL, timeout, headers: getHeaders() });
export const initClient = () => {
    console.info('Re intializing the axios client');
    axiosClient =  axios.create({ baseURL, timeout, headers: getHeaders() });

    axiosClient.interceptors.response.use(
        (response) => {
            const log: AppLogLine = {
                time: new Date(),
                user: "TO BE FILLED BY SERVICE",
                logType: "REST API CALL",
                requestURL: response.config.url || '',
                requestType: response.config.method  || 'UNDEFIEND METHOD',
                result: response.status + ''
            }
            // Process as usual
            return response;
        },
        // Handle error responses
        (error) => {
            let updateError:any = false;
            var { response } = error;
            const log: AppLogLine = {
                time: new Date(),
                user: "TO BE FILLED BY SERVICE",
                logType: "REST API CALL",
                requestURL: response.config.url || '',
                requestType: response.config.method  || 'UNDEFIEND METHOD',
                result: response.status + ''
            };
            updateError = handleErrorResponses(response.status, response.config.url || '');
           

            // if there is a midified error, then throw it
            if(updateError) throw updateError;

            // proceed as usual
            return error;
        }
    );

    // Call before every request
    axiosClient.interceptors.request.use((config) => {
        // Check token is expire

        // proceed as usual
        return config;
    })
}

const handleErrorResponses = (code: number, url: string) => {
    let message,
        title = '';

    // const isErrorReadingFile = true;
    switch (code) {
        case 401:
        case 403:
        case 404:
            message = `You are not authorized to access this resource.`;
            title = 'Unauthorized';
            break;
        case 500:
            message = `Error in APIs to respond to this request`;
            break;
        default:
    }
    if(message) {
        // Show notifications
        console.error({message, title})
    }
}

export { axiosClient }

