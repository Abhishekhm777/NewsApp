import {View, Text, TouchableOpacity} from 'react-native';
import React, {PropsWithChildren, useCallback} from 'react';
import {Swipeable} from 'react-native-gesture-handler';

interface Props {
  item: any;
}
const NewsCard: React.FC<Props> = ({item}) => {
  const deleteArticle = useCallback(item => {
    // TODO Remove the item
  }, []);

  const togglePin = useCallback(item => {
    // TODO toggle the pined item
  }, []);

  return (
    <View>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity onPress={() => deleteArticle(item)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        )}>
        <TouchableOpacity onPress={() => togglePin(item)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

export default NewsCard;
