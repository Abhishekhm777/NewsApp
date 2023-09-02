import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './styles';
import {fetchTopHeadLines, getNewsFromLocal} from '../utils/apis';
import NewsCard from './NewsCard';
import {useSelector} from 'react-redux';
import {setTopHeadLines} from '../redux/actionCreators/newAppActions';

const NewsScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const topNews: Article[] = useSelector(
    (state: any) => state?.headLines?.headLines,
  );

  React.useEffect(() => {
    fetchTopHeadLines();
  }, []);

  React.useEffect(() => {
    if (topNews?.length === 0) {
      getNewsFromLocal().then(list => setTopHeadLines([...topNews, ...list]));
    }
  });

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const removeItem = useCallback(
    (item: Article) => {
      setTopHeadLines(
        topNews?.filter(data => data?.source?.name !== item?.source?.name),
      );
      LayoutAnimation.configureNext(layoutAnimConfig);
    },
    [topNews],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    getNewsFromLocal(page).then(list => {
      setTopHeadLines([...topNews, ...list]);
      setLoading(false);
      setPage(page + 1);
    });
  }, [topNews]);

  const renderNewsItem = ({item}: Article) => (
    <NewsCard item={item} removeItem={removeItem} />
  );

  const itemKeyExtractor = (item: Article, index: Number) =>
    `${item?.title} + ${index}`;

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMore}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={styles.indicator} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={topNews}
        renderItem={renderNewsItem}
        keyExtractor={itemKeyExtractor}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainerStyle}
      />
    </View>
  );
};

export default NewsScreen;
