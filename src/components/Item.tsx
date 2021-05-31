import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import type { Feature } from '..';

type Props = {
  item: Feature;
  isLastIndex: boolean;
  slideToNextItem: () => void;
  announcementWidth: number;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  continueButtonTitle?: string;
  lastIndexButtonTitle?: string;
};

const { width } = Dimensions.get('window');

const Item = ({
  item,
  isLastIndex,
  slideToNextItem,
  announcementWidth,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  continueButtonTitle,
  lastIndexButtonTitle,
}: Props) => {
  const continueTitle = continueButtonTitle ?? 'Next';
  const lastIndexTitle = lastIndexButtonTitle ?? 'Start';

  return (
    <View style={[styles.content, { width: announcementWidth }]}>
      <View style={styles.topContent}>
        <Image
          style={[styles.image, { width: width - 96 }]}
          resizeMode={'contain'}
          source={item.image}
        />
        <Text style={[styles.title, titleStyle]}>{item.title}</Text>
        {item.description && (
          <Text style={[styles.description, descriptionStyle]}>
            {item.description}
          </Text>
        )}
      </View>
      <View>
        <Pressable
          style={[styles.pressable, buttonStyle]}
          onPress={slideToNextItem}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>
            {isLastIndex ? lastIndexTitle : continueTitle}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  topContent: {
    paddingHorizontal: 32,
  },
  image: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 16,
    color: '#333F48',
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    color: '#697684',
  },
  pressable: {
    backgroundColor: '#64B5F6',
    marginTop: 22,
    alignItems: 'center',
    borderRadius: 3,
    marginHorizontal: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
  },
});

export default Item;
