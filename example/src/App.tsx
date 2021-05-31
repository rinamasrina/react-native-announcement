import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Announcement } from '../..';
import type { Feature } from '../../src';

const FEATURES: Feature[] = [
  {
    image: require('./assets/laptop.png'),
    title: 'Stay organized',
    description:
      'Get an overview of how you are performing and motivate yourself to achieve even more',
  },
  {
    image: require('./assets/travel.png'),
    title: 'Personalise your journey',
    description:
      'Create unique emotional story that describes your work better than words',
  },
  {
    image: require('./assets/launch.png'),
    title: 'Share your work',
    description:
      'Find new opportunities to make your voice heard. Be loud and proud!',
  },
];

export default function App() {
  const [announcementVisible, setAnnouncementVisible] = React.useState(false);

  React.useEffect(() => {
    setAnnouncementVisible(true);
  }, []);

  const handleDoneButtonOnPressed = () => {
    setAnnouncementVisible(false);
  };

  return (
    <View style={styles.container}>
      {announcementVisible && (
        <Announcement
          visible={announcementVisible}
          handleDoneButtonOnPressed={handleDoneButtonOnPressed}
          features={FEATURES}
        />
      )}
      <Text>Sample of Announcement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
