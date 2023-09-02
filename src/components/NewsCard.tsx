import {View, TouchableOpacity, Image} from 'react-native';
import React, {PropsWithChildren, useCallback} from 'react';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import Text from '../utils/customComponents/Text';
interface Props {
  item: Article;
  removeItem: (item: Article) => void;
}
const NewsCard: React.FC<Props> = ({item, removeItem}) => {
  const deleteArticle = (article: Article) => {
    removeItem(article);
  };

  const togglePin = useCallback(item => {
    // TODO toggle the pined item
  }, []);

  return (
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={styles.card}
        renderRightActions={() => (
          <TouchableOpacity
            onPress={() => deleteArticle(item)}
            style={styles.deleteContainer}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        )}>
        <Image source={{uri: item?.urlToImage}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          {/* <Text style={styles.description}>{item.description}</Text> */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.pinButton}>Pin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default NewsCard;
