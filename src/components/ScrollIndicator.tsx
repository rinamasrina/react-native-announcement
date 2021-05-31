import { Animated, StyleSheet, View } from 'react-native';
import React from 'react';
import type { Feature } from '..';

type ScrollIndicatorProps = {
  scrollX: Animated.Value;
  data: Feature[];
  announcementWidth: number;
};

const ScrollIndicator = ({
  scrollX,
  data,
  announcementWidth,
}: ScrollIndicatorProps) => {
  return (
    <View style={styles.rowCentered}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * announcementWidth,
          index * announcementWidth,
          (index + 1) * announcementWidth,
        ];

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#D2D5DA', '#697684', '#D2D5DA'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${index}`}
            style={[styles.indicator, { backgroundColor: backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ScrollIndicator;
