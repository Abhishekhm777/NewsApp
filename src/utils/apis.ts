import { setTopHeadLines } from '../redux/actionCreators/newAppActions';
import { API_KEY } from './const';
import httpRequest from './httpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTopHeadLines = () => {
  const props: IApiProps = {
    url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${API_KEY}`,
    retry: true,
    timeout: 1000,
  };
  httpRequest(props)
    .then(res => {
      setNewsToLocal(res);
    })
    .catch((error: any) => {
      // const errorConfig = error[0];
    });
};

async function setNewsToLocal(items: HeadLines) {
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < items?.articles?.length; i += batchSize) {
    const batch = items?.articles?.slice(i, i + batchSize);
    batches.push(batch);
  }

  try {
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const serializedBatch = JSON.stringify(batch);
      await AsyncStorage.setItem(`batch_${i}`, serializedBatch);
    }
    console.log('Large list stored successfully.');
  } catch (error) {
    console.error('Error storing large list:', error);
  }
}

export async function getNewsFromLocal(batch: number = 0) {
  try {
    console.log('CLCC', batch);
    const serializedBatch = await AsyncStorage.getItem(`batch_${batch}`);
    const items = JSON.parse(serializedBatch);

    console.log('Large list retrieved successfully:');
    return items !== null ? items : [];
  } catch (error) {
    console.error('Error retrieving large list:', error);
    return [];
  }
}
