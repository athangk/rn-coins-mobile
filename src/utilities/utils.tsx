import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

export const secureSave = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const secureDelete = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const getSecureValue = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
};

export const handleCryptoPass = async (password: string) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
};

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    throw new Error('storing unavailable');
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error('no entry');
  }
};
