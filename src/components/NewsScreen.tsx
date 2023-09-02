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
import styles, {ITEM_HEIGHT} from './styles';
import {fetchTopHeadLines, getNewsFromLocal} from '../utils/apis';
import NewsCard from './NewsCard';
import {useSelector} from 'react-redux';
import {setTopHeadLines} from '../redux/actionCreators/newAppActions';

const NewsScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showMoreBtn, setShowMoreBtn] = useState<boolean>(true);

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
    [topNews, layoutAnimConfig],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    getNewsFromLocal(page).then(list => {
      if (list?.length === 0) {
        setShowMoreBtn(false);
      }
      setTopHeadLines([...topNews, ...list]);
      setLoading(false);
      setPage(page + 1);
    });
  }, [topNews, page]);

  const renderNewsItem = useCallback(
    ({item}: Article) => <NewsCard item={item} removeItem={removeItem} />,
    [removeItem],
  );

  const itemKeyExtractor = useCallback(
    (item: Article, index: Number) => `${index} + ${item?.url}`,
    [],
  );

  const getItemLayout = (data: Article, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderFooter = useCallback(() => {
    if (!showMoreBtn) {
      return null;
    }
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          // activeOpacity={0.1}
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
  }, [showMoreBtn, loadMore, loading]);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews
        data={topNews}
        renderItem={renderNewsItem}
        initialNumToRender={6}
        getItemLayout={getItemLayout}
        keyExtractor={itemKeyExtractor}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainerStyle}
      />
    </View>
  );
};

export default NewsScreen;
