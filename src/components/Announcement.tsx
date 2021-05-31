import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Modal,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ScrollIndicator from './ScrollIndicator';
import type { Feature } from '..';
import Item from './Item';

const { width, height } = Dimensions.get('window');
const TOTAL_MARGIN_HORIZONTAL = 44;
const ANNOUNCEMENT_WIDTH = width - TOTAL_MARGIN_HORIZONTAL;

type AnnouncementProps = {
  visible: boolean;
  handleDoneButtonOnPressed: () => void;
  features: Feature[];
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  continueButtonTitle?: string;
  lastIndexButtonTitle?: string;
};

export const Announcement = ({
  visible,
  handleDoneButtonOnPressed,
  features,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  continueButtonTitle,
  lastIndexButtonTitle,
}: AnnouncementProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(0, features.length - 1)
  );
  const [currentOffset, setCurrentOffset] = useState(
    currentIndex * ANNOUNCEMENT_WIDTH
  );
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
    index = parseInt(String(index + Math.round(diff / ANNOUNCEMENT_WIDTH)), 10);

    setCurrentOffset(offset);
    setCurrentIndex(index);
  };

  const onScrollEnd = (event: any) => {
    updateIndex(
      event.nativeEvent.contentOffset
        ? event.nativeEvent.contentOffset.x
        : event.nativeEvent.position * ANNOUNCEMENT_WIDTH
    );
  };

  const slideToNextItem = (index: number) => {
    const nextIndex = index + 1;

    if (index === features.length - 1) {
      handleDoneButtonOnPressed();
    } else {
      flatListRef?.current?.scrollToIndex({ animated: true, index: nextIndex });

      setImmediate(() => {
        onScrollEnd({ nativeEvent: { position: nextIndex } });
      });
    }
  };

  const renderItem: ListRenderItem<Feature> = ({ item, index }) => {
    return (
      <Item
        item={item}
        isLastIndex={index === features.length - 1}
        slideToNextItem={() => slideToNextItem(index)}
        announcementWidth={ANNOUNCEMENT_WIDTH}
        titleStyle={titleStyle}
        descriptionStyle={descriptionStyle}
        buttonStyle={buttonStyle}
        buttonTextStyle={buttonTextStyle}
        continueButtonTitle={continueButtonTitle}
        lastIndexButtonTitle={lastIndexButtonTitle}
      />
    );
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.dimBackground} />
      <View style={styles.absoluteCenter}>
        <View style={[styles.container, { maxHeight: height - 50 }]}>
          <Animated.FlatList
            ref={flatListRef}
            data={features}
            keyExtractor={(_, index) => `announcement-${index}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={animatedEvent}
            onMomentumScrollEnd={onScrollEnd}
            renderItem={renderItem}
          />
          <ScrollIndicator
            scrollX={scrollX}
            data={features}
            announcementWidth={ANNOUNCEMENT_WIDTH}
          />
        </View>
      </View>
    </Modal>
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
});
