import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import StringifyAsyncStorage from '../utils/StringifyAsyncStorage';
// import { useNavigation } from '@react-navigation/core';

// const TAG = 'OnBoarding';
// const ANNOUNCEMENT_STORAGE_KEY = '@storage:onBoarding';
const { width, height } = Dimensions.get('window');
const TOTAL_MARGIN_HORIZONTAL = 44;
const ON_BOARDING_WIDTH = width - TOTAL_MARGIN_HORIZONTAL;

type Data = {
  id: number;
  image: any;
  title: string;
  description: string;
};

const DATA = [
  {
    id: 1,
    image: require('../assets/laptop.png'),
    title: 'Explore our new experience',
    description:
      'Discover diverse locations, properties and content in a seamless, intuitive way.',
  },
  {
    id: 2,
    image: require('../assets/coffee.png'),
    title: 'Personalise your property journey',
    description:
      'Find your dream home with personalised location based on your preferences.',
  },
];

export const Announcement: React.FC = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(0, DATA.length - 1)
  );
  const [currentOffset, setCurrentOffset] = useState(
    currentIndex * ON_BOARDING_WIDTH
  );
  // const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const flatListRef = useRef<FlatList>(null);

  const animatedEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const updateIndex = (offset: number) => {
    const diff = offset - currentOffset;
    let index = currentIndex;

    if (!diff) {
      return;
    }
    index = parseInt(String(index + Math.round(diff / ON_BOARDING_WIDTH)), 10);

    setCurrentOffset(offset);
    setCurrentIndex(index);
  };

  const onScrollEnd = (event: any) => {
    updateIndex(
      event.nativeEvent.contentOffset
        ? event.nativeEvent.contentOffset.x
        : event.nativeEvent.position * ON_BOARDING_WIDTH
    );
  };

  const slideToNextItem = (index: number) => {
    const nextIndex = index + 1;

    if (index === DATA.length - 1) {
      // StringifyAsyncStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, true).then(() => {
      //   setVisible(false);
      //   // navigation.navigate('Home');
      // });
    } else {
      flatListRef?.current?.scrollToIndex({ animated: true, index: nextIndex });

      setImmediate(() => {
        onScrollEnd({ nativeEvent: { position: nextIndex } });
      });
    }
  };

  type Props = {
    item: Data;
    index: number;
  };

  const Item = ({ item, index }: Props) => {
    return (
      <View style={styles.content}>
        <View style={styles.topContent}>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View>
          <Pressable
            style={styles.pressable}
            onPress={() => slideToNextItem(index)}
          >
            <Text style={styles.buttonText}>
              {index === DATA.length - 1 ? 'Done' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderItem: ListRenderItem<Data> = ({ item, index }) => {
    return <Item item={item} index={index} />;
  };
  // React.useEffect(() => {
  //   StringifyAsyncStorage.getItem(ANNOUNCEMENT_STORAGE_KEY).then((value) => {
  //     setVisible(!value);
  //   });
  // }, []);

  return (
    <SafeAreaProvider>
      <Modal transparent={true} visible={true}>
        <View style={styles.dimBackground} />
        <View style={styles.absoluteCenter}>
          <View style={[styles.container, { maxHeight: height - insets.top }]}>
            <Animated.FlatList
              ref={flatListRef}
              data={DATA}
              keyExtractor={(item: any) => `announcement-${item.id}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={animatedEvent}
              onMomentumScrollEnd={onScrollEnd}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  dimBackground: {
    flex: 1,
    backgroundColor: '#21282E',
    opacity: 0.4,
  },
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 22,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 22,
  },
  content: {
    justifyContent: 'space-between',
    paddingVertical: 24,
    width: ON_BOARDING_WIDTH,
  },
  topContent: {
    paddingHorizontal: 32,
  },
  image: {
    width: 100,
    height: 100,
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
    backgroundColor: 'blue',
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
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  actionTitle: {
    color: '#333F48',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
});
