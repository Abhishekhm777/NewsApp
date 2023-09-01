import { setTopHeadLines } from '../redux/actionCreators/newAppActions';
import { API_KEY } from './const';
import httpRequest from './httpRequest';

export const fetchTopHeadLines = () => {
  const props: IApiProps = {
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    retry: true,
    timeout: 1000,
  };
  httpRequest(props)
    .then(res => {
      console.log('Repose', res);
      setTopHeadLines(res);
    })
    .catch((error: any) => {
      // const errorConfig = error[0];
    });
};
