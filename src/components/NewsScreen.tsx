import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import httpRequest from '../utils/httpRequest';
import {apiCreator, fetchTopHeadLines} from '../utils/apis';
import {Swipeable} from 'react-native-gesture-handler';
import NewsCard from './NewsCard';

const NewsScreen = () => {
  React.useEffect(() => {
    // TODO: Fetch news
    fetchTopHeadLines();
  }, []);

  const renderNewsItem = ({item}: any) => <NewsCard item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default NewsScreen;
