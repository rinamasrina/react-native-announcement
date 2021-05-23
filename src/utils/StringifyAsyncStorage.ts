/**
 * Default AsyncStorage on comfort with {@link string},
 * This JSONAsyncStorage will {@link JSON#stringify} everything before storing
 * @see setItem
 * @see multiSet
 *
 * and {@link JSON#parse} everything before return, {@see parse}
 * @see getItem
 * @see multiGet
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

type Key = string;
type Value = any | null;

const parse = (value: Value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn(
      `Failed to parse value from AsyncStorage, return the original value: ${value}`,
      e
    );
  }

  return value;
};

/**
 * @param key
 * @param value
 * @returns {Promise}
 */
const setItem = (key: Key, value: Value) => {
  return new Promise<void>((resolve, reject) => {
    AsyncStorage.setItem(key, JSON.stringify(value))
      .then(() => {
        resolve();
      })
      .catch((reason) => {
        console.error('AsyncStorage:', reason.toString());
        reject(reason);
      });
  });
};

const getItem = (key: Key) => {
  return new Promise<any>((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((value) => resolve(parse(value)))
      .catch((reason) => {
        console.error('AsyncStorage:', reason.toString());
        reject(reason);
      });
  });
};

const StringifyAsyncStorage = {
  setItem,
  getItem,
};

export default StringifyAsyncStorage;
