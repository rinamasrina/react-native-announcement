import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Announcement } from '../..';

export default function App() {
  const [announcementVisible, setAnnouncementVisible] = React.useState(false);

  React.useEffect(() => {
    setAnnouncementVisible(true);
    // StringifyAsyncStorage.getItem(ANNOUNCEMENT_STORAGE_KEY).then((value) => {
    // });
  }, []);

  const handleDoneButtonOnPressed = () => {
    setAnnouncementVisible(false);
    // StringifyAsyncStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, true).then(() => {
    // });
  };

  return (
    <View style={styles.container}>
      {announcementVisible && (
        <Announcement
          visible={announcementVisible}
          handleDoneButtonOnPressed={handleDoneButtonOnPressed}
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
