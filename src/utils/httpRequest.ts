import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_KEY } from './const';

const axiosClient = axios.create({});
const axiosRetryClient = axios.create({});
axiosRetry(axiosRetryClient, { retries: 3 });

const httpRequest = ({ url, retry = false, timeout = 1000 }: IApiProps) => {
  const timeoutDuration = retry ? timeout * 2 : timeout;
  const toCancel = axios.CancelToken.source();
  const timeoutInterval = setTimeout(() => {
    toCancel.cancel('Network Error');
  }, timeoutDuration);

  const client = retry ? axiosRetryClient : axiosClient;
  return client({ url })
    .then((response: any) => {
      if (response?.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(errors);
    })
    .catch(error => Promise.reject(error))
    .finally(() => {
      clearTimeout(timeoutInterval);
    });
};

export default httpRequest;
